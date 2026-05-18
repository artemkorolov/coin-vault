import React from "react";
import { Link } from "react-router-dom";

function Coin({ id, image, name, price, priceChange = 0 }) {
	const priceColor = priceChange > 0 ? "green" : "red";

	return (
		<Link to={`/coin/${id}`} className="coin-link-wrapper">
			<div className="coin-item">
				<img src={image} alt={name} />
				<span className="coin-name">{name}</span>
				<span className="coin-price">${price ? price.toLocaleString() : "0.00"}</span>
				<span className={`coin-percent ${priceColor}`}>
					{priceChange && priceChange > 0 ? "+" : ""}
					{priceChange ? priceChange.toFixed(2) : "0.00"}%
				</span>
			</div>
		</Link>
	)
}

export default Coin