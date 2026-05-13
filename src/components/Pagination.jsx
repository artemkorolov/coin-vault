import React from "react";

function Pagination({ coinsPerPage, totalCoins, paginate, currentPage }) {
	const pageNumbers = []

	for (let i = 1; i <= Math.ceil(totalCoins / coinsPerPage); i++) {
		pageNumbers.push(i)
	}

	return (
		<nav>
			<ul className="pagination-list">
				{pageNumbers.map(number => (
					<li key={number}>
						<button
							onClick={() => paginate(number)}
							className={`pagination-btn ${currentPage === number ? 'active' : ''}`}
						>
							{number}
						</button>
					</li>
				))}
			</ul>
		</nav>
	)
}

export default Pagination