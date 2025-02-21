export default function createInputHandler(state, display, timer, metrics) {
  function handleDelete(e) {
    if (e.inputType === "deleteContentBackward" && state.currentIndex > 0) {
      state.currentIndex--;
      if (state.charStatus[state.currentIndex] === true) {
        state.correctChars--;
      } else if (state.charStatus[state.currentIndex] === false) {
        state.errors--;
      }
      state.charStatus[state.currentIndex] = null;
      display.updateVisibleText();
      display.updateDisplay();
      return true;
    }
    return false;
  }

  function handleInput(e) {
    const typedChar = e.target.value[state.currentIndex];
    const currentChar = state.text[state.currentIndex];

    if (!state.isTestActive) {
      state.isTestActive = true;
      timer.start();
    }

    if (handleDelete(e)) return;

    if (currentChar === " ") {
      state.currentWordIndex++;
    }

    display.updateVisibleText();

    if (typedChar === currentChar) {
      state.correctChars++;
      state.charStatus[state.currentIndex] = true;
    } else {
      state.errors++;
      state.charStatus[state.currentIndex] = false;
    }
    state.currentIndex++;
    display.updateDisplay();
  }

  return {
    handleInput,
    handleDelete,
  };
}
