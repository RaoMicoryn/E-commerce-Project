import { useNavigate } from "react-router-dom";
import { useStore } from "../../context/StoreContext";
import CartItem from "../../components/CartItem";
import OrderSummary from "../../components/OrderSummary";
import "./CheckoutPage.css";

export default function CheckoutPage() {
  const { state, dispatch } = useStore();
  const navigate = useNavigate();

  function handlePlaceOrder() {
    dispatch({ type: "CLEAR_CART" });
    navigate("/summary");
  }

  return (
    <div className="checkout-page">
      <div className="checkout-page__header">
        <div>
          <p className="page-eyebrow">Review</p>
          <h1 className="page-title">Your Cart</h1>
        </div>
        {state.cart.length > 0 && (
          <span className="checkout-page__count">
            {state.totalItems} item{state.totalItems !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      <div className="checkout-page__layout">
        <div className="checkout-page__items">
          {state.cart.length === 0 ? (
            <div className="checkout-page__empty">
              <div className="checkout-page__empty-icon">🛒</div>
              <h3>Your cart is empty</h3>
              <p>Add some products before checking out.</p>
            </div>
          ) : (
            state.cart.map((item) => (
              <CartItem key={item.id} item={item} />
            ))
          )}
        </div>

        <OrderSummary onPlaceOrder={handlePlaceOrder} />
      </div>
    </div>
  );
}
