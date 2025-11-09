import React, { useEffect, useState } from 'react'
import { useCart } from '@components/CartContext'
import '@styles/Checkout.scss'

const Checkout = () => {
  const { cart, clearCart, total } = useCart()
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (!cart || cart.length === 0) {
      // if cart empty, user should go to store — we won't redirect automatically here
    }
  }, [cart])

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simular envío
    setTimeout(() => {
      clearCart()
      setSubmitted(true)
    }, 800)
  }

  if (submitted) {
    return (
      <div className="success-modal open">
        <div className="success-content">
          <div className="success-icon">✓</div>
          <h2>¡Compra Realizada!</h2>
          <p>Muchas gracias por tu compra. Recibirás un email con los detalles del pedido.</p>
        </div>
      </div>
    )
  }

  return (
    <main className="container checkout-page">
      <h1>Finalizar Compra</h1>
      <div className="checkout-container">
        <div className="checkout-form-section">
          <form className="checkout-form" id="checkoutForm" onSubmit={handleSubmit}>
            <div className="form-section">
              <h3>Datos Personales</h3>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="fullName">Nombre Completo *</label>
                  <input type="text" id="fullName" name="fullName" required maxLength={50} />
                </div>
                <div className="form-group">
                  <label htmlFor="dni">DNI *</label>
                  <input type="text" id="dni" name="dni" pattern="[0-9]{7,8}" required maxLength={8} />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="phone">Teléfono *</label>
                <input type="tel" id="phone" name="phone" required maxLength={15} />
              </div>
            </div>

            <div className="form-section">
              <h3>Dirección de Envío</h3>
              <div className="form-group">
                <label htmlFor="address">Dirección Completa *</label>
                <input type="text" id="address" name="address" placeholder="Calle, Número, Piso, Depto" required maxLength={60} />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="city">Ciudad *</label>
                  <input type="text" id="city" name="city" required maxLength={30} />
                </div>
                <div className="form-group">
                  <label htmlFor="postalCode">Código Postal *</label>
                  <input type="text" id="postalCode" name="postalCode" required maxLength={10} />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>Datos de Pago</h3>
              <div className="form-group">
                <label htmlFor="cardNumber">Número de Tarjeta *</label>
                <input type="text" id="cardNumber" name="cardNumber" placeholder="1234 5678 9012 3456" maxLength={19} required />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="cardExpiry">Vencimiento *</label>
                  <input type="text" id="cardExpiry" name="cardExpiry" placeholder="MM/AA" maxLength={5} required />
                </div>
                <div className="form-group">
                  <label htmlFor="cardCvv">CVV *</label>
                  <input type="text" id="cardCvv" name="cardCvv" placeholder="123" maxLength={3} required />
                </div>
              </div>
            </div>

            <div className="checkout-actions">
              <button type="submit" className="btn primary">Confirmar Compra</button>
            </div>
          </form>
        </div>

        <div className="checkout-summary-section">
          <div className="checkout-summary">
            <h3>Resumen de Compra</h3>
            <div id="checkoutItems">
              {cart.map(item => (
                <div key={item.id || item.name} className="checkout-item">
                  <span>{item.name} x{item.quantity}</span>
                  <span>{item.price ? '$ ' + (item.price * item.quantity).toLocaleString() : ''}</span>
                </div>
              ))}
            </div>
            <div className="checkout-total"><strong>Total: {total ? '$ ' + total.toLocaleString() : '$ 0'}</strong></div>
          </div>
        </div>
      </div>
      </main>
  )
}

export default Checkout
