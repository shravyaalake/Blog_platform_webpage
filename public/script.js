const promptEl = document.getElementById("prompt");
const generateBtn = document.getElementById("generateBtn");
const clearBtn = document.getElementById("clearBtn");
const statusEl = document.getElementById("status");
const blogContentEl = document.getElementById("blogContent");
const blogSectionEl = document.getElementById("blogSection");
const copyBtn = document.getElementById("copyBtn");
const toneSelect = document.getElementById("toneSelect");
const lengthSelect = document.getElementById("lengthSelect");

// Helper: build a richer prompt with tone & length
function buildFullPrompt(basePrompt) {
  const tone = toneSelect.value;
  const length = lengthSelect.value;

  let toneDesc = "neutral and informative";
  if (tone === "casual") toneDesc = "casual, friendly and conversational";
  if (tone === "formal") toneDesc = "formal, academic and well-structured";
  if (tone === "persuasive")
    toneDesc = "persuasive, marketing-style but still clear";

  let lengthDesc = "around 1000 words";
  if (length === "short") lengthDesc = "around 600 words";
  if (length === "long") lengthDesc = "around 1500 words";

  return `${basePrompt}

Please write a ${lengthDesc} blog post in a ${toneDesc} tone.`;
}

// Helper: convert markdown-ish heading syntax to HTML
function renderBlogHtml(text) {
  if (!text) return "";

  let html = text.trim();

  html = html
    .replace(/^### (.*)$/gim, "<h3>$1</h3>")
    .replace(/^## (.*)$/gim, "<h2>$1</h2>")
    .replace(/^# (.*)$/gim, "<h1>$1</h1>");

  const lines = html.split(/\n+/);
  html = lines
    .map((line) => {
      const trimmed = line.trim();
      if (!trimmed) return "";
      if (trimmed.startsWith("<h1") || trimmed.startsWith("<h2") || trimmed.startsWith("<h3")) {
        return trimmed;
      }
      return `<p>${trimmed}</p>`;
    })
    .join("");

  return html;
}

async function generateBlog() {
  const basePrompt = promptEl.value.trim();
  if (!basePrompt) {
    statusEl.textContent = "Please enter a topic or prompt.";
    return;
  }

  const finalPrompt = buildFullPrompt(basePrompt);

  // Reset UI
  statusEl.textContent = "";
  blogContentEl.innerHTML = "";

  generateBtn.disabled = true;
  generateBtn.classList.add("is-loading");
  statusEl.textContent = "Generating your blog. This may take a few seconds...";

  try {
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: finalPrompt }),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.error || "Failed to generate blog.");
    }

    const blogText = data.blog || "";
    const formatted = renderBlogHtml(blogText);
    blogContentEl.innerHTML = formatted;
    blogSectionEl.scrollIntoView({ behavior: "smooth" });

    statusEl.textContent = "Blog generated successfully.";
  } catch (err) {
    console.error(err);
    statusEl.textContent =
      err.message || "Something went wrong. Please try again.";
  } finally {
    generateBtn.disabled = false;
    generateBtn.classList.remove("is-loading");
  }
}

// Prompt chips
document.querySelectorAll(".prompt-chip").forEach((chip) => {
  chip.addEventListener("click", () => {
    promptEl.value = chip.getAttribute("data-value") || "";
    promptEl.focus();
  });
});

// Clear button
clearBtn.addEventListener("click", () => {
  promptEl.value = "";
  blogContentEl.innerHTML = "";
  statusEl.textContent = "";
});

// Generate on button click
generateBtn.addEventListener("click", generateBlog);

// Allow Ctrl+Enter / Cmd+Enter to generate
promptEl.addEventListener("keydown", (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
    e.preventDefault();
    generateBlog();
  }
});

// Copy button
copyBtn.addEventListener("click", async () => {
  const text = blogContentEl.innerText.trim();
  if (!text) {
    statusEl.textContent = "Nothing to copy yet. Generate a blog first.";
    return;
  }
  try {
    await navigator.clipboard.writeText(text);
    statusEl.textContent = "Blog copied to clipboard.";
  } catch (err) {
    console.error(err);
    statusEl.textContent = "Unable to copy. Please copy manually.";
  }
});
