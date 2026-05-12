import React from "react";

function Coin({ image, name, price, priceChange }) {
	const priceColor = priceChange > 0 ? "green" : "red";

	return (
		<div className="coin-item">
			<img src={image} alt={name} />
			<span className="coin-name">{name}</span>
			<span className="coin-price">${price?.toLocaleString()}</span>
			<span className={`coin-percent ${priceColor}`}>
				{priceChange.toFixed(2)}%
			</span>
		</div>
	)
}

export default Coin