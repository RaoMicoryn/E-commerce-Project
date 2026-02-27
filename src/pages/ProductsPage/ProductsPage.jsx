import { useState } from "react";
import ProductCard from "../../components/ProductCard";
import Toast from "../../components/Toast";
import { PRODUCTS } from "../../data/products";
import "./ProductsPage.css";

export default function ProductsPage() {
  const [toast, setToast] = useState(null);

  function handleAddToCart(productName) {
    setToast(productName);
    setTimeout(() => setToast(null), 1800);
  }

  return (
    <div className="products-page">
      <p className="page-eyebrow">Our Selection</p>
      <h1 className="page-title">Featured<br />Products</h1>
      <p className="page-subtitle">
        Handpicked gear for the discerning professional.
      </p>

      <div className="products-page__grid">
        {PRODUCTS.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>

      <Toast message={toast} />
    </div>
  );
}
