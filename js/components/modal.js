export const modalTemplate = `
<div class="modal">
      <div class="modal-content">
        <h2 id="modal-heading"></h2>
        <p id="modal-message"></p>
        <div class="current-results">
          <h3>Test Results</h3>
          <div class="result-stats">
            <div class="stat">
              <span id="modal-wpm">0</span>
              <span>words/min</span>
            </div>
            <div class="stat">
              <span id="modal-accuracy">0</span>
              <span>accuracy, %</span>
            </div>
          </div>
        </div>
        <button id="try-again-button" class="try-again-btn">Try Again</button>
        <button class="modal-close" id="modal-close">
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </button>
      </div>
    </div>`;

function getModalMessage(
  currentResult,
  bestResult,
  isNewBest,
  wasFirstAttempt
) {
  if (wasFirstAttempt) {
    return {
      heading: "Great Start! 🎉",
      message:
        "You've completed your first typing test! Keep practicing to track your progress.",
      buttonText: "Set Another Record!",
    };
  }

  if (isNewBest) {
    return {
      heading: "New Personal Best! 🎯",
      message: "Amazing! You beat your previous record!",
      buttonText: "Let's Keep Going!",
    };
  }
  const wpmDiff = bestResult.wpm - currentResult.wpm;
  if (wpmDiff <= 5) {
    return {
      heading: "So Close! 💪",
      message: `Just ${wpmDiff} words/min away from your best score of ${bestResult.wpm} words/min.`,
      buttonText: "One More Try!",
    };
  }
  return {
    heading: "Good Effort! 👍",
    message: `Keep practicing! Your best is ${bestResult.wpm} words/min - you've got this!`,
    buttonText: "Try Again",
  };
}

export default function showModal(
  currentResult,
  bestResult,
  isNewBest,
  wasFirstAttempt,
  onTryAgain
) {
  const modalDisplay = document.querySelector(".modal");
  const modalWpm = document.querySelector("#modal-wpm");
  const modalAccuracy = document.querySelector("#modal-accuracy");
  const modalHeading = document.querySelector("#modal-heading");
  const modalMessage = document.querySelector("#modal-message");
  const tryAgainButton = document.querySelector("#try-again-button");
  const closeButton = document.querySelector("#modal-close");
  const modalContent = getModalMessage(
    currentResult,
    bestResult,
    isNewBest,
    wasFirstAttempt
  );

  modalWpm.textContent = currentResult.wpm;
  modalAccuracy.textContent = currentResult.accuracy;
  modalHeading.textContent = modalContent.heading;
  modalMessage.textContent = modalContent.message;
  tryAgainButton.textContent = modalContent.buttonText;
  modalDisplay.classList.add("show");
  document.body.classList.add("modal-open");

  tryAgainButton.addEventListener("click", () => {
    hideModal();
    if (onTryAgain) onTryAgain();
  });
  closeButton.addEventListener("click", () => {
    hideModal();
  });
}

function hideModal() {
  const modalDisplay = document.querySelector(".modal");
  modalDisplay.classList.remove("show");
  document.body.classList.remove("modal-open");
}
