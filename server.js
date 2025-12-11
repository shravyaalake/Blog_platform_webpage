import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

// Resolve __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";

if (!GEMINI_API_KEY) {
  console.warn("⚠️ GEMINI_API_KEY is not set in .env – LLM calls will fail.");
}

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

async function generateBlogWithGemini(userPrompt) {
  const fullPrompt = `
    You are a professional blog writer.

    Write a detailed, well-structured blog article of about 1000 words on:
    "${userPrompt}"

    Requirements:
    - Begin with a clear, catchy blog title
    - Use multiple sections with H2 and H3 headings
    - Use coherent paragraphs (no one-line paragraphs)
    - Use simple, readable language
    - Do NOT mention that you are an AI or language model.
    `.trim();

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [
        {
          role: "user",
          parts: [{ text: fullPrompt }],
        },
      ],
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    console.error("Gemini API error:", response.status, errText);
    throw new Error(`Gemini API error ${response.status}`);
  }

  const data = await response.json();

  // Combine all text parts from the first candidate
  const parts =
    data.candidates?.[0]?.content?.parts || [];

  const blogText = parts
    .map((p) => p.text || "")
    .join("")
    .trim();

  if (!blogText) {
    throw new Error("No text returned from Gemini.");
  }

  return blogText;
}

// API route used by script.js
app.post("/api/generate", async (req, res) => {
  try {
    const { prompt } = req.body || {};

    if (!prompt || !prompt.trim()) {
      return res.status(400).json({ error: "Prompt is required." });
    }
    if (!GEMINI_API_KEY) {
      return res
        .status(500)
        .json({ error: "Server LLM configuration missing (GEMINI_API_KEY)." });
    }

    const blog = await generateBlogWithGemini(prompt.trim());
    res.json({ blog });
  } catch (err) {
    console.error("Error in /api/generate:", err);
    res.status(500).json({
      error: "Failed to generate blog.",
      details: err.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
