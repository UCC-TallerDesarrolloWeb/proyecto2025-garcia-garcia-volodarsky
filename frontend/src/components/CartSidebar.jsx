import "@styles/Cart.scss";
import { useNavigate } from "react-router-dom";
import { useCart } from "@components/CartContext";
import Button from "@components/Button";

const CartSidebar = () => {
  const {
    cart,
    cartOpen,
    closeCart,
    changeQuantity,
    removeFromCart,
    total,
    clearCart,
  } = useCart();
  const navigate = useNavigate();

  return (
    <div
      id="cartSidebar"
      className={`cart-sidebar ${cartOpen ? "open" : ""}`}
      aria-hidden={!cartOpen}
    >
      <div className="cart-header">
        <h3>Tu Carrito</h3>
        <button
          className="cart-close"
          onClick={closeCart}
          aria-label="Cerrar carrito"
        >
          ×
        </button>
      </div>
      <div className="cart-content">
        {cart.length === 0 ? (
          <p className="cart-empty">Tu carrito está vacío</p>
        ) : (
          <div id="cartItems">
            {cart.map((item) => (
              <div
                className="cart-item"
                key={item.serverId || item.productId || item.name}
              >
                <div className="item-left">
                  <span className="item-name">{item.name}</span>
                  <span className="item-price">
                    ${(item.price || 0).toLocaleString()}
                  </span>
                </div>
                <div className="item-right">
                  <div className="quantity-controls">
                    <button
                      className="qty-btn"
                      onClick={() =>
                        changeQuantity(item.serverId, (item.quantity || 1) - 1)
                      }
                    >
                      -
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button
                      className="qty-btn"
                      onClick={() =>
                        changeQuantity(item.serverId, (item.quantity || 1) + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(item.serverId)}
                    aria-label={`Remover ${item.name}`}
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {cart.length > 0 && (
        <div className="cart-footer">
          <div className="cart-total">
            <strong>Total: ${total.toLocaleString()}</strong>
          </div>
          <div className="cart-actions">
            <Button
              onClick={() => {
                clearCart();
              }}
            >
              Vaciar Carrito
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                closeCart();
                navigate("/checkout");
              }}
            >
              Finalizar Compra
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartSidebar;
