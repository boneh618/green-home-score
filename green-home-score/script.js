const form = document.getElementById("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = Object.fromEntries(new FormData(form));

  const res = await fetch("https://green-home-score.onrender.com/score", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  const result = await res.json();

  document.getElementById("result").classList.remove("hidden");
  document.getElementById("score").innerText = "Score: " + result.score + "/100";
  document.getElementById("waste").innerText = "You waste ₪" + result.waste + "/month";

  const tips = document.getElementById("tips");
  tips.innerHTML = "";

  result.suggestions.forEach(t => {
    const li = document.createElement("li");
    li.innerText = t;
    tips.appendChild(li);
  });
});
