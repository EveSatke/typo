export default function createInputHandler(state, display, timer) {
  const characterManager = {
    updateStatus(index, isCorrect) {
      state.charStatus[index] = isCorrect;
      this.updateCounts(isCorrect);
    },

    clearStatus(index) {
      const wasCorrect = state.charStatus[index] === true;
      state.charStatus[index] = null;
      this.revertCounts(wasCorrect);
    },

    updateCounts(isCorrect) {
      if (isCorrect) state.correctChars++;
      else state.errors++;
    },

    revertCounts(wasCorrect) {
      if (wasCorrect) state.correctChars--;
      else state.errors--;
    },
  };

  const inputValidator = {
    isValidDelete(e) {
      return e.inputType === "deleteContentBackward" && state.currentIndex > 0;
    },

    isCorrectChar(typed, expected) {
      return typed === expected;
    },
  };

  const testManager = {
    activateIfNeeded() {
      if (!state.isTestActive) {
        state.isTestActive = true;
        timer.start();
      }
    },

    updatePosition() {
      state.currentIndex++;
    },

    handleWordBoundary() {
      if (state.text[state.currentIndex] === " ") {
        state.currentWordIndex++;
      }
    },
  };

  function handleDelete(e) {
    if (!inputValidator.isValidDelete(e)) return false;
    state.currentIndex--;
    characterManager.clearStatus(state.currentIndex);
    display.updateVisibleText();
    display.updateDisplay();
    return true;
  }

  function handleInput(e) {
    const typedChar = e.target.value[state.currentIndex];
    const currentChar = state.text[state.currentIndex];

    testManager.activateIfNeeded();

    if (handleDelete(e)) return;

    testManager.handleWordBoundary();
    display.updateVisibleText();
    const isCorrect = inputValidator.isCorrectChar(typedChar, currentChar);
    characterManager.updateStatus(state.currentIndex, isCorrect);
    testManager.updatePosition();
    display.updateDisplay();
  }

  return {
    handleInput,
    handleDelete,
  };
}
