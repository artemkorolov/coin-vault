import React from 'react'
import { useState, useEffect } from 'react'
import CoinList from './components/CoinList'
import Search from './components/Search'
import SortButtons from './components/SortButtons'
import './App.css'

function App() {
  const [coins, setCoins] = useState([{}])
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('rank')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getCryptoData = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');

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

  return (
    <div className='app-container'>
      <h1>CoinVault</h1>

      <Search handleSearch={setSearch} />

      <SortButtons sortBy={sortBy} setSortBy={setSortBy} />

      {loading ? (
        <p>Fetching market data...</p>
      ) : (
        <CoinList items={sortedCoins} />
      )}
    </div>
  )
}

export default App
