import { useCart } from "@components/CartContext";
import "@styles/Cart.scss";

const Cart = () => {
  const { cart, changeQuantity, removeFromCart, clearCart, total } = useCart();

  if (!cart || cart.length === 0) return <h2>Carrito vacío</h2>;

  return (
    <div>
      <h2>Carrito de Compras</h2>
      <ul className="cart-list">
        {cart.map((item) => (
          <li key={item.id} className="cart-item">
            <div className="cart-item-main">
              <strong>{item.name}</strong>
              <div>{item.price ? "$ " + item.price.toLocaleString() : ""}</div>
            </div>
            <div className="cart-item-actions">
              <label htmlFor={`qty-${item.id}`} className="visually-hidden">Cantidad de {item.name}</label>
              <input
                type="number"
                id={`qty-${item.id}`}
                min="1"
                value={item.quantity}
                onChange={(e) => changeQuantity(item.id, e.target.value)}
              />
              <button onClick={() => removeFromCart(item.id)}>Remover</button>
            </div>
          </li>
        ))}
      </ul>
      <div className="cart-footer">
        <strong>Total: {total ? "$ " + total.toLocaleString() : "$ 0"}</strong>
        <div className="cart-actions">
          <button onClick={clearCart}>Vaciar carrito</button>
          <button onClick={() => alert("Aquí iría el flujo de checkout")}>
            Pagar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
