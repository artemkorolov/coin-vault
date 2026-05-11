import React from 'react'
import { useState, useEffect } from 'react'
import Coin from './components/Coin'
import './App.css'

function App() {
  const [coins, setCoins] = useState([{}])
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

  return (
    <div className='app-container'>
      <h1>CoinVault</h1>

      {loading ? (
        <p>Fetching market data...</p>
      ) : (
        <div className="coin-list">
          {coins && coins.map((coin) => (
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
      )}
    </div>
  )
}

export default App
