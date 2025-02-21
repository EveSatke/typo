export default function createTypingState(initialText) {
  return {
    text: initialText,
    words: initialText.split(" "),
    isTestActive: false,
    currentIndex: 0,
    currentWordIndex: 0,
    errors: 0,
    correctChars: 0,
    charStatus: new Array(initialText.length).fill(null),
    windowSize: 40,
    windowStart: 0,

    reset(newText = null) {
      this.text = newText || this.text;
      this.words = this.text.split(" ");
      this.isTestActive = false;
      this.currentIndex = 0;
      this.currentWordIndex = 0;
      this.errors = 0;
      this.correctChars = 0;
      this.charStatus = new Array(this.text.length).fill(null);
      this.windowStart = 0;
    },

    getVisibleText() {
      return this.text.slice(
        this.windowStart,
        this.windowStart + this.windowSize
      );
    },
  };
}
