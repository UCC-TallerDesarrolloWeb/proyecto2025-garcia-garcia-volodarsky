import { createContext, useContext, useEffect, useState } from 'react'
import * as cartApi from '@api/cartApi'

// Proveedor del carrito (estado central)
const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const STORAGE_KEY = 'bulls_cart'

  const refreshCart = async () => {
    try {
      const server = await cartApi.getCart()
      const mapped = (server || []).map((it) => ({
        serverId: it.id,
        productId: it.productId,
        name: it.name,
        price: it.price,
        image: it.image,
        quantity: it.qty || it.quantity || 1,
      }))
      setCart(mapped)
    } catch {
      console.error('Error cargando carrito desde servidor')
      setCart([])
    }
  }

  useEffect(() => {
  // Migrar claves antiguas si existen
    try {
      const legacyA = localStorage.getItem('bullsCart')
      const legacyB = localStorage.getItem('carrito')
      if (!localStorage.getItem(STORAGE_KEY)) {
        if (legacyA) localStorage.setItem(STORAGE_KEY, legacyA)
        else if (legacyB) localStorage.setItem(STORAGE_KEY, legacyB)
      }
    } catch {
      // ignorar errores de almacenamiento
    }

    // Cargar caché desde localStorage y luego refrescar desde servidor
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw)
        if (Array.isArray(parsed)) setCart(parsed)
      }
    } catch {
      // ignorar localStorage malformado
    }

    refreshCart()

    // Sincroniza entre pestañas
    const onStorage = (e) => {
      if (e.key === STORAGE_KEY) {
        try {
          const parsed = JSON.parse(e.newValue || '[]')
          if (Array.isArray(parsed)) setCart(parsed)
        } catch {
          // ignorar
        }
      }
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const addToCart = async (product) => {
    try {
      await cartApi.addToCart(product)
      await refreshCart()
    } catch {
      console.error('Error addToCart server')
      await refreshCart()
    }
  }

  const removeFromCart = async (serverId) => {
    try {
      await cartApi.removeFromCart(serverId)
      await refreshCart()
    } catch {
      console.error('Error removeFromCart server')
      await refreshCart()
    }
  }

  const changeQuantity = async (serverId, quantity) => {
    const q = Number(quantity) || 0
    if (q <= 0) return removeFromCart(serverId)
    try {
      await cartApi.updateQty(serverId, q)
      await refreshCart()
    } catch {
      console.error('Error updateQty server')
      await refreshCart()
    }
  }

  const clearCart = async () => {
    try {
      const server = await cartApi.getCart()
      await Promise.all((server || []).map((it) => cartApi.removeFromCart(it.id)))
      setCart([])
    } catch {
      console.error('Error clearing cart on server')
      setCart([])
    }
  }

  const toggleCart = () => setCartOpen((v) => !v)
  const openCart = () => setCartOpen(true)
  const closeCart = () => setCartOpen(false)

  const cartCount = cart.reduce((sum, it) => sum + (it.quantity || 0), 0)
  const total = cart.reduce((sum, it) => sum + (Number(it.price || 0) * (it.quantity || 0)), 0)

  const value = { cart, addToCart, removeFromCart, changeQuantity, clearCart, cartCount, total, cartOpen, toggleCart, openCart, closeCart }

  // Persistir carrito en localStorage al cambiar
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart))
    } catch {
      // ignorar errores de escritura (espacio lleno)
    }
  }, [cart])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return ctx
}
