const express = require("express");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

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

    res.json({
      creator: "@sahilxalone",
      question: text,
      response: data.response || data.data?.response || data.result || "No response"
    });

  } catch (err) {
    res.status(500).json({
      creator: "@sahilxalone",
      response: "API Error"
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
