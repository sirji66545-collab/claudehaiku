const express = require("express");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

// Format AI response while preserving code blocks
function formatResponse(text) {
  if (!text) return "No response";

  return text
    // Preserve code blocks
    .replace(/```(\w+)?\n([\s\S]*?)```/g, (_, lang, code) => {
      return `\n[CODE${lang ? ":" + lang : ""}]\n${code.trim()}\n[/CODE]\n`;
    })
    // Remove markdown headings
    .replace(/^#{1,6}\s*/gm, "")
    // Remove bold
    .replace(/\*\*(.*?)\*\*/g, "$1")
    // Remove italic
    .replace(/\*(.*?)\*/g, "$1")
    // Convert bullets
    .replace(/^\-\s+/gm, "• ")
    // Clean extra blank lines
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

// Home
app.get("/", (req, res) => {
  res.json({
    creator: "@sahilxalone",
    message: "Claude Haiku API Running 🚀"
  });
});

// Claude Haiku API
app.get("/TG/@SAHILXALONE/ai/claudehaiku", async (req, res) => {
  const text = req.query.text;

  if (!text) {
    return res.status(400).json({
      creator: "@sahilxalone",
      response: "Please provide ?text="
    });
  }

  try {
    const { data } = await axios.get(
      `https://johnsnow-api3.vercel.app/ai/claudehaiku?text=${encodeURIComponent(text)}`
    );

    const answer =
      data?.data?.answer ||
      data?.data?.response ||
      data?.response ||
      data?.result ||
      "No response";

    res.json({
      creator: "@sahilxalone",
      question: text,
      response: formatResponse(answer)
    });

  } catch (err) {
    console.error(err.message);

    res.status(500).json({
      creator: "@sahilxalone",
      question: text,
      response: "Backend API Error"
    });
  }
});

// 404
app.use((req, res) => {
  res.status(404).json({
    creator: "@sahilxalone",
    response: "Endpoint Not Found"
  });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
