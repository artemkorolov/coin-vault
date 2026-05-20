# CoinVault

**CoinVault** is a modern high-performance cryptocurrency tracker designed for real-time market monitoring and personal portfolio management. Built with the latest frontend technologies, it provides a seamless user experience for tracking asset prices, sorting market data, and analyzing specific coin metrics.

## Features Implemented

* **Real-time Data Fetching & Rate Limiting:** Integrated with the CoinGecko API to display up-to-date market prices, charts, and statistics, featuring custom handling for `429 Too Many Requests` rate limits to ensure app stability.
* **Dynamic Price & Market Indicators:** Visual representation of market price changes with dynamic color coding, tailored formatting (right-aligned columns), and detailed **24h High/Low coin statistics**.
* **Data Management & UX:**
    * **Real-time Search & Layout Controls:** Instant client-side filtering and customizable dashboard view with left-aligned sorting buttons.
    * **Multi-criteria Sorting:** Sort coins dynamically by price, name, or market changes.
    * **Centered Frontend Pagination:** Smooth, optimized, and centrally positioned data splitting at the bottom of the page for enhanced UI/UX.
* **Robust Error & Data Handling:** Implemented defensive code checks to handle `null` values gracefully (e.g., missing price data in specific components) and generic error boundaries.
* **Client-Side Routing:** Implemented robust navigation using `react-router-dom`, including dedicated dynamic routes for individual coin details (`CoinPage`).
* **Modern Dark UI:** Clean, pixel-perfect custom dark theme built with modern CSS3, featuring a structured dashboard, readable coin table headers, smooth hover states, and fully production-ready clean styles.

## Technologies
* **Frontend:** React 19, Vite
* **Routing:** React Router DOM
* **Styling:** CSS3 (Modern Dark Theme)
* **API:** CoinGecko
