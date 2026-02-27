import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../context/StoreContext";
import "./SummaryPage.css";

export default function SummaryPage() {
  const { state } = useStore();
  const navigate = useNavigate();

  // Snapshot order data at mount time (before cart clears)
  const [order] = useState({
    email: state.user,
    totalItems: state.totalItems,
    totalPrice: state.totalPrice,
  });

  return (
    <div className="summary-page">
      <div className="summary-card">
        <div className="summary-card__check">✓</div>

        <h1 className="summary-card__title">
          Order<br />Confirmed!
        </h1>
        <p className="summary-card__subtitle">
          Your order has been placed successfully.<br />
          A confirmation has been sent to {order.email}.
        </p>

        <div className="summary-card__details">
          <div className="summary-card__row">
            <span className="summary-card__row-label">Email</span>
            <span className="summary-card__row-value">{order.email}</span>
          </div>
          <div className="summary-card__row">
            <span className="summary-card__row-label">Items Purchased</span>
            <span className="summary-card__row-value">
              {order.totalItems || "—"}
            </span>
          </div>
          <div className="summary-card__row">
            <span className="summary-card__row-label">Total Paid</span>
            <span className="summary-card__row-value summary-card__row-value--accent">
              ${order.totalPrice.toFixed(2)}
            </span>
          </div>
          <div className="summary-card__row">
            <span className="summary-card__row-label">Status</span>
            <span className="summary-card__row-value summary-card__row-value--success">
              ● Processing
            </span>
          </div>
        </div>

        <button
          className="summary-card__cta"
          onClick={() => navigate("/products")}
        >
          Continue Shopping →
        </button>
      </div>
    </div>
  );
}
