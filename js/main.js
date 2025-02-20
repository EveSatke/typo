import fetchApi from "./modules/textProvider.js";
import initTypingTest from "./modules/typingTest.js";
import { modalTemplate } from "./components/modal.js";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const text = await fetchApi();

    initTypingTest(text);
  } catch (error) {
    console.error("Failed to initialize", error);
  }
  document.body.insertAdjacentHTML("beforeend", modalTemplate);
});
