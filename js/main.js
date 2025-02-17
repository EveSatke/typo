import fetchApi from "./modules/textProvider.js";
import initTypingTest from "./modules/typingTest.js";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const text = await fetchApi();

    initTypingTest(text);
  } catch (error) {
    console.error("Failed to initialize", error);
  }
});
console.log(fetchApi());
