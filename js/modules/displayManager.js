export default function createDisplayManager(testText, state) {
  function updateVisibleText() {
    state.windowStart = Math.max(0, state.currentIndex - state.windowSize / 2);
    const visibleText = state.getVisibleText();
    testText.textContent = visibleText;
  }

  /**
   * Calculates various word-related indices for text display
   * @param {Object} state - The current typing state
   * @returns {Object} Contains:
   *   - currentWordIndex: Total number of words up to cursor
   *   - wordsBeforeWindow: Number of words before visible window
   *   - visibleCurrentWordIndex: Current word position in visible window
   */
  function calculateWordIndices(state) {
    // Count words up to cursor position
    const textUpToCursor = state.text.slice(0, state.currentIndex);
    const currentWordIndex = textUpToCursor.split(" ").length - 1;

    // Count words before visible window
    const textBeforeWindow = state.text.slice(0, state.windowStart);
    const lastSpaceBeforeWindow = textBeforeWindow.lastIndexOf(" ");
    const wordsBeforeWindow =
      lastSpaceBeforeWindow === -1
        ? 0
        : textBeforeWindow.slice(0, lastSpaceBeforeWindow).split(" ").length;

    return {
      currentWordIndex,
      wordsBeforeWindow,
      visibleCurrentWordIndex: currentWordIndex - wordsBeforeWindow,
    };
  }

  function getCharacterStyle(index, state) {
    if (index === 0 && state.currentIndex === 0) return "current";
    if (index === state.currentIndex) return "current";
    if (state.charStatus[index] === true) return "correct";
    if (state.charStatus[index] === false) return "error";
    return "";
  }

  function generateCharacterHTML(char, style) {
    return style ? `<span class="${style}">${char}</span>` : char;
  }

  function updateDisplay() {
    let displayText = "";
    let wordStart = state.windowStart;
    let currentWord = 0;

    // Count words before window

    const { visibleCurrentWordIndex } = calculateWordIndices(state);
    for (
      let i = state.windowStart;
      i < state.windowStart + state.windowSize;
      i++
    ) {
      if (i >= state.text.length) break;

      // Start new word
      if (i === wordStart) {
        displayText += `<span class="${
          currentWord === visibleCurrentWordIndex ? "current-word" : ""
        }">`;
      }

      const char = state.text[i];
      const style = getCharacterStyle(i, state);
      displayText += generateCharacterHTML(char, style);

      // End word and prepare for next
      if (char === " " || i === state.text.length - 1) {
        displayText += "</span>";
        wordStart = i + 1;
        currentWord++;
      }
    }

    renderText(displayText);
  }

  function renderText(html) {
    testText.innerHTML = html;
  }

  return {
    updateVisibleText,
    updateDisplay,
  };
}
