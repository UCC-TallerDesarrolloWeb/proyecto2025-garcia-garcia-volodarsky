import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '@components/CartContext'
// logo moved to public
const logo = '/logo-bulls.png'

const Header = () => {
  const { cartCount, toggleCart } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
  <header className="site-header">
      <div className="logo">
        <img src={logo} alt="Chicago Bulls"/>
        <span>Chicago Bulls</span>
      </div>
      <div className="header-right">
        <nav className={`primary-nav ${menuOpen ? 'active' : ''}`} aria-label="Principal">
          <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/roster">Roster</Link></li>
            <li><Link to="/calendario">Calendario</Link></li>
            <li><Link to="/historia">Historia</Link></li>
            <li><Link to="/nosotros">Nosotros</Link></li>
            <li><Link to="/shop">Shop</Link></li>
          </ul>
        </nav>

        <div className="cart-counter" id="cartCounter" onClick={() => toggleCart()}>
          <span>🛒 <span id="cartCount">{cartCount}</span></span>
        </div>

        <button
          className={`menu-toggle ${menuOpen ? 'active' : ''}`}
          id="menuToggle"
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => setMenuOpen((s) => !s)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  )
}

export default Header
