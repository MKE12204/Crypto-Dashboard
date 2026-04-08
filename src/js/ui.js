const cryptoBody = document.getElementById('cryptoBody');

function showToast(message) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerText = message;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 4000);
}

function playAlertSound() {
    try {
        const context = new (window.AudioContext || window.webkitAudioContext)();
        const osc = context.createOscillator();
        const gain = context.createGain();
        osc.connect(gain);
        gain.connect(context.destination);
        osc.type = 'sine';
        osc.frequency.value = 880;
        gain.gain.setValueAtTime(0.05, context.currentTime);
        osc.start();
        osc.stop(context.currentTime + 0.1);
    } catch(e) {}
}

function formatCash(n, symbol = '$') {
    let formatted = n;
    if (n >= 1e12) formatted = +(n / 1e12).toFixed(2) + " T";
    else if (n >= 1e9) formatted = +(n / 1e9).toFixed(2) + " B";
    else if (n >= 1e6) formatted = +(n / 1e6).toFixed(2) + " M";
    else formatted = n.toLocaleString();
    return symbol + formatted;
}

function renderTable(coins, favorites, currencySymbol, animate = false) {
    cryptoBody.innerHTML = "";
    
    coins.forEach(coin => {
        const isFav = favorites.includes(coin.id);
        const color = coin.price_change_percentage_24h > 0 ? 'text-green' : 'text-red';
        const row = document.createElement('tr');
        if (animate) row.classList.add('price-changed');

        // Исправление отображения BTC (8 знаков)
        const priceFormatted = currentCurrency === 'btc' 
            ? coin.current_price.toFixed(8) 
            : coin.current_price.toLocaleString();

        row.innerHTML = `
            <td><span class="star ${isFav ? 'active' : ''}" onclick="toggleFav(event, '${coin.id}')">★</span></td>
            <td>${coin.market_cap_rank}</td>
            <td>
                <div class="coin-info">
                    <img src="${coin.image}">
                    <span>${coin.name} <span class="coin-symbol">${coin.symbol.toUpperCase()}</span></span>
                </div>
            </td>
            <td style="font-weight:bold">${currencySymbol}${priceFormatted}</td>
            <td class="${color}">${coin.price_change_percentage_24h?.toFixed(2)}%</td>
            <td class="hide-mobile">${formatCash(coin.market_cap, currencySymbol)}</td>
            <td class="hide-mobile"><canvas id="chart-${coin.id}" width="120" height="40"></canvas></td>
        `;
        row.onclick = () => showModal(coin, currencySymbol);
        cryptoBody.appendChild(row);
        renderSparkline(coin);
    });
}

function renderSparkline(coin) {
    const canvas = document.getElementById(`chart-${coin.id}`);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: coin.sparkline_in_7d.price,
            datasets: [{
                data: coin.sparkline_in_7d.price,
                borderColor: coin.price_change_percentage_24h > 0 ? '#00ff88' : '#ff3366',
                borderWidth: 1.5,
                pointRadius: 0,
                fill: false,
                tension: 0.4
            }]
        },
        options: {
            responsive: false,
            plugins: { legend: { display: false }, tooltip: { enabled: false } },
            scales: { x: { display: false }, y: { display: false } }
        }
    });
}

function showModal(coin, symbol) {
    const modal = document.getElementById('coinModal');
    const content = document.getElementById('modalData');
    
    const priceDisplay = currentCurrency === 'btc' 
        ? coin.current_price.toFixed(8) 
        : coin.current_price.toLocaleString();

    content.innerHTML = `
        <div style="text-align:center; margin-bottom:20px;">
            <img src="${coin.image}" width="50">
            <h2>${coin.name}</h2>
        </div>
        <p>Price: <strong>${symbol}${priceDisplay}</strong></p>
        <div class="converter-box">
            <label>How many ${coin.symbol.toUpperCase()}?</label>
            <input type="number" id="calcInput" placeholder="Quantity..." oninput="updateCalc(${coin.current_price}, '${symbol}')">
            <p id="calcResult" style="margin-top:10px; color:var(--primary); font-weight:bold;"></p>
        </div>
    `;
    modal.style.display = "flex";
}

function updateCalc(price, symbol) {
    const val = document.getElementById('calcInput').value;
    if (!val) {
        document.getElementById('calcResult').innerText = "";
        return;
    }
    const result = (val * price);
    const finalResult = currentCurrency === 'btc' ? result.toFixed(8) : result.toLocaleString();
    document.getElementById('calcResult').innerText = `= ${symbol}${finalResult}`;
}