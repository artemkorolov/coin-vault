import React from "react"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

function CoinPage() {
	const { id } = useParams()
	const [coin, setCoin] = useState()
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const getCoin = async () => {
			try {
				const response = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`)

				const data = await response.json()

				setCoin(data)

				setLoading(false)

			} catch (error) {
				console.log(error);

				setLoading(false)
			}
		}

		getCoin() 
	}, [id])

	if (loading || !coin) {
		return <h2>Loading...</h2>
	}

	const { name, symbol, market_data = {}, image = {} } = coin;
	const price = market_data?.current_price?.usd;

	return (
		<div className="coin-page">
			<img className="coin-image" src={image?.large} alt={name} width="100" />
			<h2 className="coin-page-name">{name}</h2>
			
			<p className="coin-symbol">Symbol: {symbol}</p>
			<div className="coin-price-container">
				<span className="price-label">Current Price:</span>
			</div>
			<span className="price-value">${price?.toLocaleString()}</span>
		</div>
	)
}

export default CoinPage