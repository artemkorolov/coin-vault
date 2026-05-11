import React from "react";

function Search({ handleSearch }) {
	return (
		<div className="search-container">
			<input
				type="text"
				placeholder="Search for a coin..."
				className="search-input"
				onChange={(e) => handleSearch(e.target.value)}
			/>
		</div>
	)
}

export default Search