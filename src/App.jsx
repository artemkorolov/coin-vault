import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import CoinPage from './pages/CoinPage'

function App() {
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
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/coin/:id" element={<CoinPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
