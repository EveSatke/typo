import config from "../../config.js";

/**
 * Converts array of text lines into a single string
 */
function normalizeText(text) {
  return Array.isArray(text) ? text.join(" ") : String(text);
}

/**
 * Removes special characters, extra spaces and converts to lowercase
 * Keeps only alphanumeric characters and single spaces
 */
function sanitizeText(text) {
  return text
    .replace(/\W\s*|\s+/g, " ")
    .trim()
    .toLowerCase();
}

/**
 * Removes words that are too short (3 chars or less)
 * This helps ensure meaningful typing tests
 */
function filterWords(text) {
  return text
    .split(" ")
    .filter((word) => word.length > 3)
    .join(" ");
}

function cleanText(text) {
  const normalized = normalizeText(text);
  const sanitized = sanitizeText(normalized);
  return filterWords(sanitized);
}

async function fetchPoetry() {
  const response = await fetch(config.api.poetryApi);
  if (!response.ok) {
    throw new error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data[0].lines;
}

export default async function fetchApi() {
  try {
    const poetryText = await fetchPoetry();
    return cleanText(poetryText);
  } catch (error) {
    console.error("Error fetching poetry:", error.message);
    return cleanText(config.api.defaultText);
  }
}
