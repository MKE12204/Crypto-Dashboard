const API_BASE = 'https://api.coingecko.com/api/v3';

// Вспомогательная функция для паузы между запросами
const delay = ms => new Promise(res => setTimeout(res, ms));

async function getCryptoData(currency = 'usd', page = 1) {
    // Бесплатный тариф часто режет запросы, если они идут слишком часто
    const url = `${API_BASE}/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=20&page=${page}&sparkline=true`;
    
    const response = await fetch(url);
    
    if (response.status === 429) {
        showToast("API Limit reached. Wait a moment...");
        throw new Error("Rate limit");
    }
    
    if (!response.ok) throw new Error("API Error");
    return await response.json();
}

async function getFearGreedIndex() {
    try {
        const res = await fetch('https://api.alternative.me/fng/');
        const data = await res.json();
        return data.data[0];
    } catch (e) {
        return { value: 'N/A', value_classification: 'Unknown' };
    }
}

async function getFearGreedIndex() {
    try {
        const response = await fetch('https://api.alternative.me/fng/');
        const data = await response.json();
        return data.data[0]; // Возвращает объект с value и value_classification
    } catch (error) {
        console.error("Ошибка индекса страха:", error);
        return { value: "N/A", value_classification: "Unknown" };
    }
}

async function getFearGreedIndex() {
    try {
        const response = await fetch('https://api.alternative.me/fng/');
        const data = await response.json();
        return data.data[0]; // Возвращает объект с value и value_classification
    } catch (error) {
        console.error("Ошибка индекса страха:", error);
        return { value: "N/A", value_classification: "Unknown" };
    }
}