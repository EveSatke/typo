function renderEmptyState(container) {
  const historyItem = document.createElement("div");

  historyItem.innerHTML = `<div class="table-message">Time to make history! Complete your first typing test.</div>`;
  container.appendChild(historyItem);
}

function renderHistoryItem(item, container) {
  const date = new Date(item.date).toLocaleDateString();
  const historyItem = document.createElement("div");
  historyItem.className = "history-item";
  historyItem.innerHTML = `
          <div>${date}</div>
          <div>${item.wpm}</div>
          <div>${item.accuracy}</div>`;
  container.appendChild(historyItem);
}

export default function displayHistory(history) {
  const historyItems = document.querySelector("#history-items");

  if (!historyItems) return;

  historyItems.innerHTML = "";

  if (history.length <= 0) {
    renderEmptyState(historyItems);
    return;
  }
  history.forEach((item) => renderHistoryItem(item, historyItems));
}
