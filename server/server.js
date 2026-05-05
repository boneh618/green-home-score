const express = require('express');
const app = express();

app.use(express.json());
app.use(require('cors')());

function calculateScore(data) {
    let score = 50;
    let suggestions = [];

    if (data.ac === "inverter") score += 10;
    if (data.ac === "old") {
        score -= 10;
        suggestions.push("Upgrade AC → save ₪70/month");
    }

    if (data.heater === "solar") score += 15;
    if (data.heater === "electric") {
        score -= 10;
        suggestions.push("Switch to solar heater → save ₪80/month");
    }

    if (data.fridge === "new") score += 10;
    if (data.fridge === "old") {
        score -= 10;
        suggestions.push("Replace fridge → save ₪40/month");
    }

    if (data.lights === "led") score += 10;
    if (data.lights === "regular") {
        score -= 10;
        suggestions.push("Switch to LED → save ₪30/month");
    }

    if (data.insulation === "good") score += 15;
    if (data.insulation === "poor") {
        score -= 15;
        suggestions.push("Improve insulation → save ₪100/month");
    }

    if (data.windows === "double") score += 10;
    if (data.windows === "single") {
        score -= 10;
        suggestions.push("Upgrade windows → save ₪50/month");
    }

    if (data.habits === "good") score += 10;
    if (data.habits === "bad") {
        score -= 10;
        suggestions.push("Turn off unused devices → save ₪20/month");
    }

    score = Math.max(0, Math.min(100, score));
    const waste = (100 - score) * 5;

    return {
        score,
        waste,
        suggestions: suggestions.slice(0, 3)
    };
}

app.post('/score', (req, res) => {
    res.json(calculateScore(req.body));
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});