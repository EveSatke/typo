/**
 * API configuration
 */
const apiConfig = {
  poetryApi: "https://poetrydb.org/random,linecount/1;14/lines",
  defaultText:
    "Business meetings, and professional recordings can contain sensitive data, so security is something a transcription company should not overlook when providing services. Companies should therefore follow the various laws and industry best practice, especially so when serving law firms, government agencies or courts. Medical Transcription specifically is governed by HIPAA, which elaborates data security practices and compliance measures to be strictly followed, failure of which leads to legal action and penalties. Transcription security includes maintaining confidentiality of the data through information security practices including limiting access with passwords and ensuring a secure environment for data and appropriate methods of disposal of all materials and deletion of files. Personnel may be required to sign non-disclosure agreements on a regular basis as well as take various oaths regarding confidentiality and accuracy.",
};

/**
 * Storage related configuration
 */
const storageConfig = {
  keys: {
    history: "history",
    bestResult: "bestResult",
  },
  maxHistoryItems: 20,
};

/**
 * Application settings
 */
const appConfig = {
  // Default test duration in seconds
  defaultTestDuration: 60,
};

const config = {
  storage: storageConfig,
  app: appConfig,
  api: apiConfig,
};

export default config;
