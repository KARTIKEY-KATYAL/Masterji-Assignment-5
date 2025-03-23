/**
 * Converts markdown text to HTML and displays in output area
 * - Gets input text from textarea
 * - Adds loading state while processing
 * - Uses marked library to parse markdown to HTML
 * - Handles errors with toast notifications
 */
function markdowntext() {
  const output = document.getElementById("outputtext");
  output.classList.add("loading");

  try {
    const inputtext = input.value;
    // Use setTimeout to prevent UI blocking during parsing
    setTimeout(() => {
      output.innerHTML = marked.parse(inputtext);
      output.classList.remove("loading");
    }, 0);
  } catch (error) {
    showToast("Error parsing markdown");
    output.classList.remove("loading");
  }
}

/**
 * Resets/Clears the input textarea
 */
function resetinput() {
  input.value = "";
}

/**
 * Shows temporary notification messages
 * - Creates toast element
 * - Adds to DOM
 * - Removes after 3 seconds
 * @param {string} message - Message to display in toast
 */
function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}

/**
 * Copies rendered markdown output to clipboard
 * - Gets text content from output div
 * - Uses clipboard API to copy
 * - Shows success/error toast messages
 */
function copyoutput() {
  const output = document.getElementById("outputtext");
  const outputtext = output.textContent;
  if (outputtext !== "") {
    navigator.clipboard
      .writeText(outputtext)
      .then(() => showToast("Copied to clipboard!"))
      .catch(() => showToast("Failed to copy"));
  } else {
    showToast("Please enter some markdown first");
  }
}

// Get DOM elements
const input = document.getElementById("inputtext");
const reset = document.getElementById("resetbtn");
const copy = document.getElementById("copybtn");

// Add event listeners
reset.addEventListener("click", resetinput);
input.addEventListener("input", markdowntext); // Real-time markdown preview
copy.addEventListener("click", copyoutput);

/**
 * Configure marked library options
 * - Enable line breaks
 * - Enable GitHub Flavored Markdown
 * - Configure syntax highlighting using highlight.js
 */
marked.setOptions({
  breaks: true, // Convert line breaks to <br>
  gfm: true, // Enable GitHub Flavored Markdown
  highlight: function (code, language) {
    // Syntax highlighting for code blocks
    if (language && hljs.getLanguage(language)) {
      try {
        return hljs.highlight(code, { language: language }).value;
      } catch (err) {
        console.error(err);
        return code;
      }
    }
    return hljs.highlightAuto(code).value;
  },
});

// Initialize highlight.js
hljs.highlightAll();
