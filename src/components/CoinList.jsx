import React from "react";
import Coin from "./Coin";

function CoinList({ items }) {
	return (
		<div className="coin-list">
			{items.map((coin) => (
				coin.id && (
					<Coin
						key={coin.id}
						image={coin.image}
						name={coin.name}
						price={coin.current_price}
					/>
				)
			))}
		</div>
	)
}

export default CoinList