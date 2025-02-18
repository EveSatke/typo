export default function initMetrics() {
  const wpmDisplay = document.querySelector("#wpm-value");
  const accuracyDisplay = document.querySelector("#accuracy-value");

  function calculateWPM(correctChars, timeElapsed) {
    if (timeElapsed <= 0) {
      return 0;
    }
    const minutes = timeElapsed / 60;
    const WPM = Math.round(correctChars / 5 / minutes);
    return WPM;
  }

  function calculateAccuracy(correctChars, totalErrors) {
    const totalChars = correctChars + totalErrors;
    const accuracy = Math.round((correctChars / totalChars) * 100);
    return accuracy;
  }

  function updateMetricsDisplay(wpm, accuracy) {
    wpmDisplay.textContent = wpm;
    accuracyDisplay.textContent = accuracy;
  }

  return {
    calculateWPM,
    calculateAccuracy,
    updateMetricsDisplay,
  };
}
