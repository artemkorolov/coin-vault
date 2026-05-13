import React from "react";
import Coin from "./Coin";

function CoinList({ items }) {
	return (
		<div className="coin-list">
			{items.map((coin) => (
				coin.id && (
					<Coin
						key={coin.id}
						id={coin.id}
						image={coin.image}
						name={coin.name}
						price={coin.current_price}
						priceChange={coin.price_change_percentage_24h}
					/>
				)
			))}
		</div>
	)
}

export default CoinList