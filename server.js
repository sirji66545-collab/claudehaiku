const express = require("express");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

// Home
app.get("/", (req, res) => {
  res.json({
    creator: "@sahilxalone",
    message: "Claude Haiku API Running 🚀"
  });
});

// Claude Haiku Endpoint
app.get("/TG/@SAHILXALONE/ai/claudehaiku", async (req, res) => {
  const text = req.query.text;

  if (!text) {
    return res.status(400).json({
      creator: "@sahilxalone",
      response: "Please provide ?text=Hello"
    });
  }

  try {
    const { data } = await axios.get(
      `https://johnsnow-api3.vercel.app/ai/claudehaiku?text=${encodeURIComponent(text)}`
    );

    res.json({
      creator: "@sahilxalone",
      question: text,
      response:
        data?.data?.answer ||
        data?.data?.response ||
        data?.response ||
        "No response"
    });

  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      creator: "@sahilxalone",
      question: text,
      response: "Backend API Error"
    });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
