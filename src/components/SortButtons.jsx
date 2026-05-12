import React from "react";

function SortButtons({ sortBy, setSortBy }) {
	return (
		<div className="sort-buttons">
			<button
				className={sortBy === 'price' ? 'sort-btn active' : 'sort-btn'}
				onClick={() => setSortBy('price')}>
				Sort by Price
			</button>
			<button
				className={sortBy === 'name' ? 'sort-btn active' : 'sort-btn'}
				onClick={() => setSortBy('name')}>
				Sort by Name
			</button>
		</div>
	)
}

export default SortButtons