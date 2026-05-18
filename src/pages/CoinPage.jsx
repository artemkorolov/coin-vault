import React from "react"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

function CoinPage() {
	const { id } = useParams()
	const [coin, setCoin] = useState()
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')

	useEffect(() => {
		const getCoin = async () => {
			try {
				setLoading(true)
				setError('')
				const response = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`)

				if (!response.ok) {
					if (response.status === 429) {
						throw new Error('CoinGecko rate limit exceeded (429). Please wait a moment.');
					}
					throw new Error(`Failed to load coin details. Status: ${response.status}`);
				}

				const data = await response.json()

				setCoin(data)

				setLoading(false)

			} catch (error) {
				console.log("Error fetching coin details:", error);

				if (error.message === 'Failed to fetch') {
					setError('Failed to load coin data. Most likely, the rate limit has been exceeded (429).');
				} else {
					setError(error.message)
				}
				setLoading(false)
			}
		}

		getCoin()
	}, [id])

	if (error) {
		return (<div className="error-container" style={{ textAlign: 'center', padding: '50px', color: '#e74c3c' }}>
			<h2>Oops! Failed to load coin details</h2>
			<p>{error}</p>
			<button
				onClick={() => window.location.reload()}
				style={{ padding: '8px 16px', marginTop: '15px', cursor: 'pointer' }}
			>
				Try Again
			</button>
		</div>
		)
	}

	if (loading || !coin) {
		return <h2>Loading...</h2>
	}

	const { name, symbol, market_data = {}, image = {} } = coin;
	const price = market_data?.current_price?.usd;

	const high24h = market_data?.high_24h?.usd
	const low24h = market_data?.low_24h?.usd

	return (
		<div className="coin-page">
			<img className="coin-image" src={image?.large} alt={name} width="100" />
			<h2 className="coin-page-name">{name}</h2>

			<p className="coin-symbol">Symbol: {symbol}</p>
			<div className="coin-price-container">
				<span className="price-label">Current Price:</span>
			</div>
			<span className="price-value">${price?.toLocaleString()}</span>

			<div className="coin-stats-24h">
				<div className="stat-box">
					<span>24h High</span>
					<strong>{high24h && high24h > 0 ? `$${high24h.toLocaleString()}` : "—"}</strong>
				</div>

				<div className="stat-box">
					<span>24h Low</span>
					<strong>{low24h && low24h > 0 ? `$${low24h.toLocaleString()}` : "-"}</strong>
				</div>
			</div>

		</div>
	)
}

export default CoinPage