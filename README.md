# Crypto Dashboard - Real-Time Market Tracker

A sleek, responsive, and high-performance Cryptocurrency Dashboard built with vanilla JavaScript. This project provides real-time market data, interactive charts, and a personalized user experience.

![Dashboard Preview](https://img.shields.io/badge/Status-Complete-success?style=for-the-badge)
![JS](https://img.shields.io/badge/JavaScript-ES6+-yellow?style=for-the-badge&logo=javascript)
![CSS3](https://img.shields.io/badge/CSS3-Modern_Flexbox_&_Grid-blue?style=for-the-badge&logo=css3)

## ✨ Key Features

- **Live Market Data:** Fetches real-time prices, market cap, and 24h changes via the **CoinGecko API**.
- **Interactive Sparklines:** Visualizes the last 7 days of price action using **Chart.js**.
- **Advanced Sorting:** Smart sorting by price and percentage change with animated visual indicators.
- **Personalized Favorites:** Add coins to your watchlist (saved via `localStorage`).
- **Fear & Greed Index:** Integrated sentiment analysis for the crypto market.
- **Currency Switcher:** Toggle between **USD, EUR, and BTC** with automatic price formatting (up to 8 decimal places for BTC).
- **Extreme Mobile Adaptation:** Custom Grid-based layout optimized specifically for **iPhone SE, 12, 14, and 15**.
- **Built-in Converter:** Quickly calculate coin values directly in the modal window.
- **Offline Mode:** Uses cached data if the API limit (Rate Limit 429) is reached.

## 🛠 Tech Stack

- **HTML5:** Semantic structure.
- **CSS3:** Custom properties (variables), Flexbox, CSS Grid, and sophisticated Media Queries.
- **JavaScript (Vanilla):** Asynchronous programming (`async/await`), DOM manipulation, and Modular architecture.
- **Chart.js:** Lightweight library for data visualization.
- **Alternative.me API:** For the Fear & Greed Index data.

## 📱 Mobile-First Design

The application features a unique responsive logic. While desktop users see a comprehensive table, mobile users get a "Card-View" experience similar to top-tier apps like Binance or CoinGecko, ensuring readability on screens as small as 320px.

## ⚙️ Project Structure

```CRYPTO/
├── src/
│   ├── css/
│   │   └── style.css       # Modern UI styles & Extreme responsiveness
│   ├── img/
│   │   └── bitcoin_fv.svg  # Project assets & icons
│   └── js/
│       ├── api.js          # API handling & Error management (Status 429 logic)
│       ├── ui.js           # Rendering logic, formatters & Sparklines
│       └── script.js       # State management, Event listeners & Sorting
├── index.html              # Main entry point & HTML5 structure
└── README.md               # Project documentation