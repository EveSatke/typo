export default function createDisplayManager(testText, state) {
  function updateVisibleText() {
    state.windowStart = Math.max(0, state.currentIndex - state.windowSize / 2);
    const visibleText = state.getVisibleText();
    testText.textContent = visibleText;
  }

  function updateDisplay() {
    let displayText = "";
    let wordStart = state.windowStart;
    let currentWord = 0;

    // Calculate current word index based on current character position
    const textUpToCursor = state.text.slice(0, state.currentIndex);
    const currentWordIndex = textUpToCursor.split(" ").length - 1;

    // Count words before window
    const textBeforeWindow = state.text.slice(0, state.windowStart);
    const lastSpaceBeforeWindow = textBeforeWindow.lastIndexOf(" ");
    const wordsBeforeWindow =
      lastSpaceBeforeWindow === -1
        ? 0
        : textBeforeWindow.slice(0, lastSpaceBeforeWindow).split(" ").length;

    const visibleCurrentWordIndex = currentWordIndex - wordsBeforeWindow;

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

      // Add character with appropriate highlighting
      if (i === 0 && state.currentIndex === 0) {
        displayText += `<span class="current">${char}</span>`;
      } else if (i === state.currentIndex) {
        displayText += `<span class="current">${char}</span>`;
      } else if (state.charStatus[i] === true) {
        displayText += `<span class="correct">${char}</span>`;
      } else if (state.charStatus[i] === false) {
        displayText += `<span class="error">${char}</span>`;
      } else {
        displayText += char;
      }

      // End word and prepare for next
      if (char === " " || i === state.text.length - 1) {
        displayText += "</span>";
        wordStart = i + 1;
        currentWord++;
      }
    }

    testText.innerHTML = displayText;
  }
  return {
    updateVisibleText,
    updateDisplay,
  };
}
