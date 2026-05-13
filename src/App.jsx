import React from 'react'
import { useState, useEffect } from 'react'
import CoinList from './components/CoinList'
import Search from './components/Search'
import SortButtons from './components/SortButtons'
import Pagination from './components/Pagination'
import './App.css'

function App() {
  const [coins, setCoins] = useState([{}])
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('rank')
  const [currentPage, setCurrentPage] = useState(1)
  const [coinsPerPage] = useState(10)
  const [loading, setLoading] = useState(true)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  useEffect(() => {
    const getCryptoData = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=30&page=1&sparkline=false');

        const data = await response.json()

        setCoins(data)

        setLoading(false)

      } catch (error) {
        console.error("Something went wrong", error);

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

  return (
    <div className='admin-wrapper'>
      <aside className="sidebar">
        <div className="sidebar-logo">
          <h2>CoinVault</h2>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li className="nav-item active">
              Dashboard
            </li>
          </ul>
        </nav>
      </aside>

      <main className="main-content">
        <section className="table-section">
          <header className="content-header">
            <h1>Dashboard</h1>
            <Search handleSearch={setSearch} />
          </header>

          <SortButtons sortBy={sortBy} setSortBy={setSortBy} />

          <Pagination
            coinsPerPage={coinsPerPage}
            totalCoins={sortedCoins.length}
            paginate={paginate}
            currentPage={currentPage}
          />

          {loading ? (
            <p>Fetching market data...</p>
          ) : (
            <CoinList items={currentCoins} />
          )}

        </section>
      </main>
    </div>
  )
}

export default App
