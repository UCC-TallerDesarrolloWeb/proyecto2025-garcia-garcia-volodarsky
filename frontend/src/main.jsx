import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@styles/main.scss'
import Shop from './pages/shop.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/layout.jsx'
import Home from './pages/home.jsx'
import Cart from './pages/cart.jsx'
import Calendario from './pages/calendario.jsx'
import Roster from './pages/roster.jsx'
import Historia from './pages/historia.jsx'
import Nosotros from './pages/nosotros.jsx'
import Checkout from './pages/checkout.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/calendario" element={<Calendario />} />
          <Route path="/roster" element={<Roster />} />
          <Route path="/historia" element={<Historia />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/checkout" element={<Checkout />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)