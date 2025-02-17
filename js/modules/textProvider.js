const poetryApi = "https://poetrydb.org/random,linecount/1;14/lines";
const defaultText =
  "Business meetings, and professional recordings can contain sensitive data, so security is something a transcription company should not overlook when providing services. Companies should therefore follow the various laws and industry best practice, especially so when serving law firms, government agencies or courts. Medical Transcription specifically is governed by HIPAA, which elaborates data security practices and compliance measures to be strictly followed, failure of which leads to legal action and penalties. Transcription security includes maintaining confidentiality of the data through information security practices including limiting access with passwords and ensuring a secure environment for data and appropriate methods of disposal of all materials and deletion of files. Personnel may be required to sign non-disclosure agreements on a regular basis as well as take various oaths regarding confidentiality and accuracy.";

function cleanText(text) {
  const textToClean = Array.isArray(text) ? text.join(" ") : String(text);

  const cleanedText = textToClean
    .replace(/\W\s*|\s+/g, " ")
    .trim()
    .toLowerCase();

  return cleanedText
    .split(" ")
    .filter((word) => word.length > 3)
    .join(" ");
}

export default async function fetchApi() {
  try {
    const response = await fetch(poetryApi);
    if (response.ok) {
      const data = await response.json();
      const cleanedText = cleanText(data[0].lines);
      return cleanedText;
    } else {
      console.error("Promise resolved but HTTP status failed");
      return cleanText(defaultText);
    }
  } catch (error) {
    console.error("Error Fetching data ", error);
    return cleanText(defaultText);
  }
}
