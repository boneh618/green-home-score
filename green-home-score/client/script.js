const form = document.getElementById('form');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(form));

    const res = await fetch('https://green-home-score.onrender.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    const result = await res.json();

    document.getElementById('result').classList.remove('hidden');
    document.getElementById('score').innerText = `Score: ${result.score}/100`;
    document.getElementById('waste').innerText = `You waste about ₪${result.waste}/month`;

    const tips = document.getElementById('tips');
    tips.innerHTML = "";
    result.suggestions.forEach(s => {
        const li = document.createElement('li');
        li.innerText = s;
        tips.appendChild(li);
    });
});