import React from "react";
import { Link } from "react-router-dom";

function Coin({ id, image, name, price, priceChange }) {
	const priceColor = priceChange > 0 ? "green" : "red";

	return (
		<Link to={`/coin/${id}`} className="coin-link-wrapper">
			<div className="coin-item">
				<img src={image} alt={name} />
				<span className="coin-name">{name}</span>
				<span className="coin-price">${price?.toLocaleString()}</span>
				<span className={`coin-percent ${priceColor}`}>
					{priceChange > 0 ? "+" : ""}
					{priceChange.toFixed(2)}%
				</span>
			</div>
		</Link>
	)
}

export default Coin