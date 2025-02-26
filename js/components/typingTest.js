import createTypingState from "../modules/typingState.js";
import createDisplayManager from "../modules/displayManager.js";
import createInputHandler from "../modules/inputHandler.js";
import initTimer from "../utils/timer.js";
import initMetrics from "../utils/metrics.js";
import initStorage from "../services/storage.js";
import displayHistory from "../components/history.js";
import showModal from "../components/modal.js";
import fetchApi from "../services/textProvider.js";
import config from "../../config.js";

export default function initTypingTest(initialText) {
  const testText = document.querySelector("#test-text");
  const input = document.querySelector("#typing-input");
  const restartButton = document.querySelector("#restart-button");

  const timer = initTimer(config.app.defaultTestDuration);
  const metrics = initMetrics();
  const storage = initStorage();

  const state = createTypingState(initialText);
  const display = createDisplayManager(testText, state);
  const inputHandler = createInputHandler(state, display, timer);

  function updateMetrics() {
    const timeElapsed = 60 - timer.getTimeLeft();
    const wpm = metrics.calculateWPM(state.correctChars, timeElapsed);
    const accuracy = metrics.calculateAccuracy(
      state.correctChars,
      state.errors
    );
    metrics.updateMetricsDisplay(wpm, accuracy);
  }

  async function changeText() {
    try {
      testText.textContent = "Loading...";
      const newText = await fetchApi();
      state.reset(newText);
      resetTest();
    } catch (error) {
      console.error("Failed to fetch text", error);
      testText.textContent = "Error loading text. Please try again.";
    }
  }

  function resetTest() {
    input.value = "";
    input.disabled = false;
    state.reset(state.text);
    display.updateVisibleText();
    display.updateDisplay();
    input.focus();
    timer.reset();
    updateMetrics();
  }

  input.disabled = false;
  input.focus();
  displayHistory(storage.getHistory());

  timer.onTimeEnd(() => {
    input.disabled = true;
    display.updateDisplay();
    const wpm = metrics.calculateWPM(state.correctChars, 60);
    const accuracy = metrics.calculateAccuracy(
      state.correctChars,
      state.errors
    );
    const { result, isNewBest, wasFirstAttempt } = storage.saveTestResult(
      wpm,
      accuracy
    );
    showModal(
      result,
      storage.getBestResult(),
      isNewBest,
      wasFirstAttempt,
      changeText
    );
    displayHistory(storage.getHistory());
  });

  timer.onTick(updateMetrics);
  input.addEventListener("input", inputHandler.handleInput);
  restartButton.addEventListener("click", changeText);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") resetTest();
    if (e.key === "Enter") changeText();
  });

  display.updateDisplay();
}
