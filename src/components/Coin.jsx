import React from "react";

function Coin({ image, name, price }) {
	return (
		<div className="coin-item">
			<img src={image} alt={name} />
			<span className="coin-name">{name}</span>
			<span className="coin-price">${price?.toLocaleString()}</span>
		</div>
	)
}

export default Coin