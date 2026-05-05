const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.post("/score", (req, res) => {
  const data = req.body;

  let score = 50;
  let suggestions = [];

  if (data.ac === "old") {
    score -= 10;
    suggestions.push("Upgrade AC → save ₪70/month");
  }

  score = Math.max(0, Math.min(100, score));

  res.json({
    score,
    waste: (100 - score) * 5,
    suggestions
  });
});

app.listen(PORT, () => {
  console.log("Server running on " + PORT);
});
