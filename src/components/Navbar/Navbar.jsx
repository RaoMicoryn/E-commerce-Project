import { Link, useLocation, useNavigate } from "react-router-dom";
import { useStore } from "../../context/StoreContext";
import "./Navbar.css";

export default function Navbar() {
  const { state, dispatch } = useStore();
  const navigate = useNavigate();
  const location = useLocation();

  if (location.pathname === "/login") return null;

  function handleLogout() {
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  }

  return (
    <nav className="navbar">
      <Link to="/products" className="navbar__brand">
        <span className="navbar__brand-accent">Obsi</span>dian
      </Link>

      <div className="navbar__right">
        <Link
          to="/products"
          className={`navbar__link ${
            location.pathname === "/products" ? "navbar__link--active" : ""
          }`}
        >
          Products
        </Link>

        <Link
          to="/checkout"
          className={`navbar__link ${
            location.pathname === "/checkout" ? "navbar__link--active" : ""
          }`}
        >
          Checkout
          {state.totalItems > 0 && (
            <span className="navbar__cart-badge">{state.totalItems}</span>
          )}
        </Link>

        {state.user && (
          <span className="navbar__email">{state.user}</span>
        )}

        <button className="navbar__logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}
