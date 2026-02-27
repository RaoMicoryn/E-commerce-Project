import { useStore } from "../../context/StoreContext";
import "./CartItem.css";

export default function CartItem({ item }) {
  const { dispatch } = useStore();

  function handleRemove() {
    dispatch({ type: "REMOVE_FROM_CART", payload: item.id });
  }

  return (
    <div className="cart-item">
      <div className="cart-item__icon">{item.emoji}</div>

      <div className="cart-item__info">
        <div className="cart-item__name">{item.name}</div>
        <div className="cart-item__meta">
          Qty: {item.qty} &nbsp;·&nbsp; ${item.price.toFixed(2)} ea.
        </div>
      </div>

      <div className="cart-item__price">
        ${(item.price * item.qty).toFixed(2)}
      </div>

      <button className="cart-item__remove" onClick={handleRemove}>
        Remove
      </button>
    </div>
  );
}
