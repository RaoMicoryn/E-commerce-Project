import { useStore } from "../../context/StoreContext";
import "./OrderSummary.css";

export default function OrderSummary({ onPlaceOrder }) {
  const { state } = useStore();

  return (
    <div className="order-summary">
      <h3 className="order-summary__title">Order Summary</h3>

      {state.cart.length === 0 ? (
        <p className="order-summary__empty">No items in cart.</p>
      ) : (
        state.cart.map((item) => (
          <div key={item.id} className="order-summary__line">
            <span className="order-summary__line-name">
              {item.name} ×{item.qty}
            </span>
            <span className="order-summary__line-price">
              ${(item.price * item.qty).toFixed(2)}
            </span>
          </div>
        ))
      )}

      <div className="order-summary__total">
        <span className="order-summary__total-label">Total</span>
        <span className="order-summary__total-price">
          ${state.totalPrice.toFixed(2)}
        </span>
      </div>

      <button
        className="order-summary__btn"
        onClick={onPlaceOrder}
        disabled={state.cart.length === 0}
      >
        Place Order →
      </button>
    </div>
  );
}
