import { useEffect, useState } from 'react'
import * as cartApi from '../api/cartApi'

// Custom hook providing cart state and actions without using useContext
// This intentionally avoids useContext so consumers only rely on useState/useEffect
export function useCart() {
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)

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
    } catch (e) {
      console.error('Error cargando carrito desde servidor', e)
      setCart([])
    }
  }

  useEffect(() => {
    refreshCart()
    // no dependencies: each hook instance refreshes on mount
  }, [])

  const addToCart = async (product) => {
    try {
      await cartApi.addToCart(product)
      await refreshCart()
    } catch (e) {
      console.error('Error addToCart server', e)
      await refreshCart()
    }
  }

  const removeFromCart = async (serverId) => {
    try {
      await cartApi.removeFromCart(serverId)
      await refreshCart()
    } catch (e) {
      console.error('Error removeFromCart server', e)
      await refreshCart()
    }
  }

  const changeQuantity = async (serverId, quantity) => {
    const q = Number(quantity) || 0
    if (q <= 0) return removeFromCart(serverId)
    try {
      await cartApi.updateQty(serverId, q)
      await refreshCart()
    } catch (e) {
      console.error('Error updateQty server', e)
      await refreshCart()
    }
  }

  const clearCart = async () => {
    try {
      const server = await cartApi.getCart()
      await Promise.all((server || []).map((it) => cartApi.removeFromCart(it.id)))
      setCart([])
    } catch (e) {
      console.error('Error clearing cart on server', e)
      setCart([])
    }
  }

  const toggleCart = () => setCartOpen((v) => !v)
  const openCart = () => setCartOpen(true)
  const closeCart = () => setCartOpen(false)

  const cartCount = cart.reduce((sum, it) => sum + (it.quantity || 0), 0)
  const total = cart.reduce((sum, it) => sum + (Number(it.price || 0) * (it.quantity || 0)), 0)

  return { cart, addToCart, removeFromCart, changeQuantity, clearCart, cartCount, total, cartOpen, toggleCart, openCart, closeCart }
}
