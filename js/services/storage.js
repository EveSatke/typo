const storageKeys = {
  history: "history",
  bestResult: "bestResult",
};

const maxHistoryItems = 20;

class TestResult {
  constructor(wpm, accuracy) {
    this.wpm = Number(wpm);
    this.accuracy = Number(accuracy);
    this.date = new Date().toISOString();
  }

  static fromJSON(json) {
    const result = new TestResult(json.wpm, json.accuracy);
    result.date = json.date;
    return result;
  }
}

export default function initStorage() {
  let history = [];

  try {
    const storedHistory = localStorage.getItem(storageKeys.history);
    if (storedHistory) {
      const parsedHistory = JSON.parse(storedHistory);
      if (Array.isArray(parsedHistory)) {
        history = parsedHistory.map((item) => TestResult.fromJSON(item));
      }
    }
  } catch (error) {
    console.warn("Failed to load history, starting fresh:", error);
    history = [];
  }

  function getHistory() {
    return Array.isArray(history) ? history : [];
  }

  function saveTestResult(wpm, accuracy) {
    if (!history) history = [];
    const result = new TestResult(wpm, accuracy);
    const isNewBest = updateBestResult(result);

    try {
      history.unshift(result);
      history = history.slice(0, maxHistoryItems);
      localStorage.setItem(storageKeys.history, JSON.stringify(history));
    } catch (error) {
      console.error("Failed to save history: ", error);
    }

    return { result, isNewBest };
  }

  function getBestResult() {
    try {
      const bestResult = localStorage.getItem(storageKeys.bestResult);
      return bestResult ? TestResult.fromJSON(JSON.parse(bestResult)) : null;
    } catch (error) {
      console.error("Failed to get best result: ", error);
      return null;
    }
  }

  function updateBestResult(result) {
    const currentBest = getBestResult();
    if (!currentBest || result.wpm > currentBest.wpm) {
      try {
        localStorage.setItem(storageKeys.bestResult, JSON.stringify(result));
        return true;
      } catch (error) {
        console.error("Failed to update best result: ", error);
        return false;
      }
    }
    return false;
  }

  return {
    saveTestResult,
    getHistory,
    getBestResult,
  };
}
