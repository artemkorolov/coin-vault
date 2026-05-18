import React from 'react'
import { useState, useEffect } from 'react'
import CoinList from '../components/CoinList'
import Search from '../components/Search'
import SortButtons from '../components/SortButtons'
import Pagination from '../components/Pagination'
import '../App.css'

function Home() {
	const [coins, setCoins] = useState([{}])
	const [search, setSearch] = useState('')
	const [sortBy, setSortBy] = useState('rank')
	const [currentPage, setCurrentPage] = useState(1)
	const [coinsPerPage] = useState(10)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	const paginate = (pageNumber) => setCurrentPage(pageNumber)

	useEffect(() => {
		const getCryptoData = async () => {
			try {
				setLoading(true)
				setError(null)

				const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=30&page=1&sparkline=false');

				if (!response.ok) {
					if (response.status === 429) {
						throw new Error('Rate limit exceeded (429). Please wait a minute and refresh the page.');
					}
					throw new Error(`Server error: Status ${response.status}`)
				}

				const data = await response.json()

				setCoins(data)

				setLoading(false)

			} catch (error) {
				console.error("Something went wrong", error);

				setError(error.message)
				setLoading(false)
			}
		}
		getCryptoData()
	}, [])

	const filteredCoins = coins.filter(coin => {
		return coin.name?.toLowerCase().includes(search.toLowerCase())
	})

	const sortedCoins = [...filteredCoins].sort((a, b) => {
		if (sortBy === 'price') {
			return b.current_price - a.current_price;
		}
		if (sortBy === 'name') {
			return a.name.localeCompare(b.name);
		}
		return 0;
	})

	const indexOfLastCoin = currentPage * coinsPerPage
	const indexOfFirstCoin = indexOfLastCoin - coinsPerPage
	const currentCoins = sortedCoins.slice(indexOfFirstCoin, indexOfLastCoin)

	if (loading) {
		return <div style={{ textAlign: 'center', padding: '40px' }}>Loading</div>;
	}

	if (error) {
		return (
			<div className="error-container" style={{ textAlign: 'center', padding: '40px', color: '#e74c3c' }}>
				<h2>Something went wrong</h2>
				<p>{error}</p>
				<button
					onClick={() => window.location.reload()}
					style={{ padding: '8px 16px', marginTop: '15px', cursor: 'pointer' }}
				>
					Try again
				</button>
			</div>
		)
	}

	return (
		<section className="table-section">
			<header className="content-header">
				<h1>Dashboard</h1>
				<Search handleSearch={setSearch} />
			</header>

			<SortButtons sortBy={sortBy} setSortBy={setSortBy} />

			{loading ? (
				<p>Fetching market data...</p>
			) : (
				<CoinList items={currentCoins} />
			)}

			<Pagination
				coinsPerPage={coinsPerPage}
				totalCoins={sortedCoins.length}
				paginate={paginate}
				currentPage={currentPage}
			/>

		</section>
	)
}

export default Home
