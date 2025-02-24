const CONFIG = {
  poetryApi: "https://poetrydb.org/random,linecount/1;14/lines",
  defaultText:
    "Business meetings, and professional recordings can contain sensitive data, so security is something a transcription company should not overlook when providing services. Companies should therefore follow the various laws and industry best practice, especially so when serving law firms, government agencies or courts. Medical Transcription specifically is governed by HIPAA, which elaborates data security practices and compliance measures to be strictly followed, failure of which leads to legal action and penalties. Transcription security includes maintaining confidentiality of the data through information security practices including limiting access with passwords and ensuring a secure environment for data and appropriate methods of disposal of all materials and deletion of files. Personnel may be required to sign non-disclosure agreements on a regular basis as well as take various oaths regarding confidentiality and accuracy.",
};

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
  const response = await fetch(CONFIG.poetryApi);
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
    return cleanText(CONFIG.defaultText);
  }
}
