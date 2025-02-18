export default function initTimer(initialTime = 60) {
  const timerDisplay = document.querySelector("#timer-value");
  const input = document.querySelector("#typing-input");
  let timeLeft = initialTime;
  let timerId = null;

  function updateDisplay() {
    timerDisplay.textContent = timeLeft;
  }

  function start() {
    if (timerId) return;
    timerId = setInterval(() => {
      timeLeft--;
      updateDisplay();

      if (timeLeft <= 0) {
        stop();
        input.disabled = true;
      }
    }, 1000);
  }

  function stop() {
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
    }
  }

  function reset() {
    stop();
    timeLeft = initialTime;
    updateDisplay();
    input.disabled = false;
  }

  function getTimeLeft() {
    return timeLeft;
  }

  updateDisplay();

  return {
    start,
    stop,
    reset,
    getTimeLeft,
  };
}
