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
    history.unshift(result);

    history = history.slice(0, 10);

    localStorage.setItem("history", JSON.stringify(history));
    displayHistory();
    console.log(history);
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
  }

  return { saveTestResult, getHistory, displayHistory };
}
