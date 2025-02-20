export default function initStorage() {
  let history = JSON.parse(localStorage.getItem("history")) || [];

  function getHistory() {
    return history;
  }

  function saveTestResult(wpmResult, accuracyResult) {
    const result = {
      wpm: wpmResult,
      accuracy: accuracyResult,
      date: new Date().toISOString(),
    };

    const isNewBest = updateBestResult(result);

    history.unshift(result);

    history = history.slice(0, 20);

    localStorage.setItem("history", JSON.stringify(history));
    displayHistory();
    return { result, isNewBest };
  }

  function displayHistory() {
    const historyItems = document.querySelector("#history-items");
    historyItems.innerHTML = "";

    history.forEach((item) => {
      const date = new Date(item.date).toLocaleDateString();
      const historyItem = document.createElement("div");
      historyItem.className = "history-item";
      historyItem.innerHTML = `
        <div>${date}</div>
        <div>${item.wpm}</div>
        <div>${item.accuracy}</div>`;
      historyItems.appendChild(historyItem);
    });
    if (history.length <= 0) {
      const historyItem = document.createElement("div");
      historyItem.innerHTML = `<div class="table-message">Time to make history! Complete your first typing test.</div>`;
      historyItems.appendChild(historyItem);
    }
  }

  function getBestResult() {
    const bestResult = JSON.parse(localStorage.getItem("bestResult")) || null;
    return bestResult;
  }

  function updateBestResult(result) {
    const currentBest = getBestResult();
    if (!currentBest || result.wpm > currentBest.wpm) {
      localStorage.setItem("bestResult", JSON.stringify(result));
      return true;
    }
    return false;
  }

  return {
    saveTestResult,
    getHistory,
    displayHistory,
    getBestResult,
  };
}
