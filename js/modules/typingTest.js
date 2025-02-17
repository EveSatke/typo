export default function initTypingTest(text) {
  const testText = document.querySelector("#test-text");
  const input = document.querySelector("#typing-input");

  // let currentText = text.split(" ").slice(0, 10).join(" ");
  // let words = text.split(" ");
  // let currentWordIndex = 10;
  let isTestActive = false;
  let currentIndex = 0;
  let errors = 0;
  let correctChars = 0;
  let charStatus = new Array(text.length).fill(null);
  // const displayLength = 80;
  const windowSize = 40;
  let windowStart = 0;
  let visibleText = text.slice(windowStart, windowStart + windowSize);

  input.disabled = false;

  function startTest() {
    isTestActive = true;
  }

  function resetTest() {
    isTestActive = false;
  }

  function updateVisibleText() {
    windowStart = Math.max(0, currentIndex - windowSize / 2);
    visibleText = text.slice(windowStart, windowStart + windowSize);
    testText.textContent = visibleText;
  }

  function updateDisplay() {
    let displayText = "";

    for (let i = windowStart; i < windowStart + windowSize; i++) {
      if (i >= text.length) break;
      const char = text[i];
      if (charStatus[i] === true) {
        displayText += `<span class="correct">${char}</span>`;
      } else if (charStatus[i] === false) {
        displayText += `<span class="error">${char}</span>`;
      } else {
        displayText += char;
      }
    }
    testText.innerHTML = displayText;
  }

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

    if (!isTestActive) {
      startTest();
    }

    if (handleDelete(e)) {
      return;
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
  });
  testText.textContent = visibleText;
}
