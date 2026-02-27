import { useState } from "react";
import { useStore } from "../../context/StoreContext";
import "./ProductCard.css";

export default function ProductCard({ product, onAddToCart }) {
  const { dispatch } = useStore();
  const [added, setAdded] = useState(false);

  function handleAddToCart() {
    if (added) return;
    dispatch({ type: "ADD_TO_CART", payload: product });
    setAdded(true);
    if (onAddToCart) onAddToCart(product.name);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <div className="product-card">
      <div className="product-card__image">
        <span className="product-card__badge">{product.category}</span>
        <span className="product-card__id">#{product.id}</span>
        {product.emoji}
      </div>

      <div className="product-card__body">
        <div className="product-card__name">{product.name}</div>
        <div className="product-card__meta">{product.category}</div>

        <div className="product-card__footer">
          <div className="product-card__price">${product.price.toFixed(2)}</div>
          <button
            className={`product-card__btn ${added ? "product-card__btn--added" : ""}`}
            onClick={handleAddToCart}
          >
            {added ? "✓ Added" : "+ Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
