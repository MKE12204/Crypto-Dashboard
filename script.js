let currentCurrency = localStorage.getItem('selectedCurrency') || 'usd';
let currentPage = parseInt(localStorage.getItem('currentPage')) || 1;
let allCoins = [];
let favorites = JSON.parse(localStorage.getItem('cryptoFavs')) || [];
let sortDirection = false; // false = desc, true = asc
let isLoading = false;

const currencySymbols = { usd: '$', eur: '€', btc: '₿' };

document.getElementById('currencySelect').value = currentCurrency;

async function initApp(isLoadMore = false) {
    if (isLoading) return;
    isLoading = true;

    const btn = document.getElementById('loadMoreBtn');
    if (btn) btn.innerText = "Loading...";

    try {
        if (!isLoadMore) {
            const fng = await getFearGreedIndex();
            document.getElementById('   -greed-container').innerHTML = `
                <div class="fng-badge">
                    <small>Fear & Greed</small><br>
                    <span class="fng-value">${fng.value_classification} (${fng.value})</span>
                </div>`;
        }

        const data = await getCryptoData(currentCurrency, currentPage);
        
        if (isLoadMore) {
            allCoins = [...allCoins, ...data];
        } else {
            allCoins = data;
        }

        localStorage.setItem('cachedCoins', JSON.stringify(allCoins));
        renderTable(allCoins, favorites, currencySymbols[currentCurrency], !isLoadMore);

    } catch (e) {
        console.error(e);
        const cached = localStorage.getItem('cachedCoins');
        if (cached) {
            allCoins = JSON.parse(cached);
            renderTable(allCoins, favorites, currencySymbols[currentCurrency]);
        }
    } finally {
        isLoading = false;
        if (btn) btn.innerText = "Load More";
    }
}

document.getElementById('currencySelect').addEventListener('change', (e) => {
    currentCurrency = e.target.value;
    localStorage.setItem('selectedCurrency', currentCurrency);
    currentPage = 1;
    allCoins = [];
    initApp();
});

document.getElementById('loadMoreBtn').onclick = () => {
    if (!isLoading) {
        currentPage++;
        initApp(true);
    }
};

function toggleFav(e, id) {
    e.stopPropagation();
    favorites = favorites.includes(id) ? favorites.filter(f => f !== id) : [...favorites, id];
    localStorage.setItem('cryptoFavs', JSON.stringify(favorites));
    renderTable(allCoins, favorites, currencySymbols[currentCurrency]);
}

function sortTable(key, element) {
    sortDirection = !sortDirection;
    
    // Сортировка данных
    allCoins.sort((a, b) => sortDirection ? a[key] - b[key] : b[key] - a[key]);

    // Визуальное обновление стрелок
    document.querySelectorAll('th').forEach(th => th.classList.remove('asc', 'desc'));
    element.classList.add(sortDirection ? 'asc' : 'desc');

    renderTable(allCoins, favorites, currencySymbols[currentCurrency]);
}

document.getElementById('coinSearch').addEventListener('input', (e) => {
    const val = e.target.value.toLowerCase();
    const filtered = allCoins.filter(c => c.name.toLowerCase().includes(val) || c.symbol.toLowerCase().includes(val));
    renderTable(filtered, favorites, currencySymbols[currentCurrency]);
});

document.querySelector('.close-modal').onclick = () => document.getElementById('coinModal').style.display = "none";
window.onclick = (e) => { if (e.target.className === 'modal') e.target.style.display = "none"; }
async function initApp(isLoadMore = false) {
    if (isLoading) return;
    isLoading = true;

    const btn = document.getElementById('loadMoreBtn');
    if (btn) btn.innerText = "Loading...";

    try {
        // --- ВОЗВРАЩАЕМ ИНДЕКС СТРАХА И ЖАДНОСТИ ---
        if (!isLoadMore) {
            const fng = await getFearGreedIndex();
            const fngContainer = document.getElementById('fear-greed-container');
            if (fngContainer) {
                fngContainer.innerHTML = `
                    <div class="fng-badge">
                        <small>Fear & Greed Index</small>
                        <span class="fng-value ${fng.value_classification.toLowerCase().replace(' ', '-')}">
                            ${fng.value_classification} (${fng.value})
                        </span>
                    </div>
                `;
            }
        }

        const data = await getCryptoData(currentCurrency, currentPage);
        
        if (isLoadMore) {
            allCoins = [...allCoins, ...data];
        } else {
            allCoins = data;
        }

        localStorage.setItem('cachedCoins', JSON.stringify(allCoins));
        renderTable(allCoins, favorites, currencySymbols[currentCurrency], !isLoadMore);

    } catch (e) {
        console.error(e);
    } finally {
        isLoading = false;
        if (btn) btn.innerText = "Load More";
    }
}
initApp();