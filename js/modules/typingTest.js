import initTimer from "./timer.js";
import initMetrics from "./metrics.js";
import fetchApi from "./textProvider.js";
import initStorage from "./storage.js";
import showModal from "../components/modal.js";

export default function initTypingTest(initialText) {
  const testText = document.querySelector("#test-text");
  const input = document.querySelector("#typing-input");
  const restartButton = document.querySelector("#restart-button");
  const timer = initTimer(60);
  const metrics = initMetrics();
  const storage = initStorage();

  let text = initialText;
  let words = text.split(" ");
  let isTestActive = false;
  let currentIndex = 0;
  let currentWordIndex = 0;
  let errors = 0;
  let correctChars = 0;
  let charStatus = new Array(text.length).fill(null);
  const windowSize = 40;
  let windowStart = 0;
  let visibleText = text.slice(windowStart, windowStart + windowSize);

  input.disabled = false;
  input.focus();
  storage.displayHistory();

  timer.onTimeEnd(() => {
    const wpm = metrics.calculateWPM(currentIndex, 60);
    const accuracy = metrics.calculateAccuracy(correctChars, errors);
    const { result, isNewBest } = storage.saveTestResult(wpm, accuracy);

    const bestResult = storage.getBestResult();
    showModal(result, bestResult, isNewBest, changeText);
  });

  function startTest() {
    isTestActive = true;
    timer.start();
  }

  async function changeText() {
    try {
      testText.textContent = "Loading...";
      text = await fetchApi();
      words = text.split(" ");
      resetTest();
    } catch (error) {
      console.error("Failed to fetch text", error);
      testText.textContent = "Error loading text. Please try again.";
    }
  }

  function resetTest() {
    isTestActive = false;
    currentIndex = 0;
    errors = 0;
    correctChars = 0;
    charStatus = new Array(text.length).fill(null);
    input.value = "";
    input.disabled = false;
    updateVisibleText();
    updateDisplay();
    input.focus();
    timer.reset();
    updateMetrics();
  }

  function updateVisibleText() {
    windowStart = Math.max(0, currentIndex - windowSize / 2);
    visibleText = text.slice(windowStart, windowStart + windowSize);
    testText.textContent = visibleText;
  }

  function updateDisplay() {
    let displayText = "";
    let wordStart = windowStart;
    let currentWord = 0;

    // Calculate current word index based on current character position
    const textUpToCursor = text.slice(0, currentIndex);
    const currentWordIndex = textUpToCursor.split(" ").length - 1;

    // Count words before window
    const textBeforeWindow = text.slice(0, windowStart);
    const lastSpaceBeforeWindow = textBeforeWindow.lastIndexOf(" ");
    const wordsBeforeWindow =
      lastSpaceBeforeWindow === -1
        ? 0
        : textBeforeWindow.slice(0, lastSpaceBeforeWindow).split(" ").length;

    const visibleCurrentWordIndex = currentWordIndex - wordsBeforeWindow;

    for (let i = windowStart; i < windowStart + windowSize; i++) {
      if (i >= text.length) break;

      // Start new word
      if (i === wordStart) {
        displayText += `<span class="${
          currentWord === visibleCurrentWordIndex ? "current-word" : ""
        }">`;
      }

      const char = text[i];

      // Add character with appropriate highlighting
      if (i === 0 && currentIndex === 0) {
        displayText += `<span class="current">${char}</span>`;
      } else if (i === currentIndex) {
        displayText += `<span class="current">${char}</span>`;
      } else if (charStatus[i] === true) {
        displayText += `<span class="correct">${char}</span>`;
      } else if (charStatus[i] === false) {
        displayText += `<span class="error">${char}</span>`;
      } else {
        displayText += char;
      }

      // End word and prepare for next
      if (char === " " || i === text.length - 1) {
        displayText += "</span>";
        wordStart = i + 1;
        currentWord++;
      }
    }

    testText.innerHTML = displayText;
  }

  function updateMetrics() {
    const timeElapsed = 60 - timer.getTimeLeft();
    const wpm = metrics.calculateWPM(currentIndex, timeElapsed);
    const accuracy = metrics.calculateAccuracy(correctChars, errors);
    metrics.updateMetricsDisplay(wpm, accuracy);
  }

  timer.onTick(() => {
    updateMetrics();
  });

  function handleDelete(e) {
    if (e.inputType === "deleteContentBackward") {
      if (currentIndex > 0) {
        currentIndex--;
        if (charStatus[currentIndex] === true) {
          correctChars--;
        } else if (charStatus[currentIndex] === false) {
          errors--;
        }
        charStatus[currentIndex] = null;
      }
      updateVisibleText();
      updateDisplay();
      console.log("delete", currentIndex);
      return true;
    }
    return false;
  }

  function handleInput(e) {
    const typedChar = e.target.value[currentIndex];
    const currentChar = text[currentIndex];
    const currentWord = words[currentWordIndex];

    if (!isTestActive) {
      startTest();
    }

    if (handleDelete(e)) {
      return;
    }

    if (currentChar === " ") {
      currentWordIndex++;
      console.log("current word", currentWord);
    }

    updateVisibleText();

    if (typedChar === currentChar) {
      correctChars++;
      charStatus[currentIndex] = true;
    } else {
      errors++;
      charStatus[currentIndex] = false;
    }
    currentIndex++;
    updateDisplay();
    console.log(currentIndex, errors, correctChars);
  }

  input.addEventListener("input", handleInput);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") resetTest();
    if (e.key === "Enter") changeText();
  });
  restartButton.addEventListener("click", () => changeText());
  testText.textContent = visibleText;

  updateDisplay();
}
