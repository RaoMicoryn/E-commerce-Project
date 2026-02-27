import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../context/StoreContext";
import "./LoginPage.css";

export default function LoginPage() {
  const { state, dispatch } = useStore();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState(false);

  useEffect(() => {
    if (state.isAuthenticated) {
      navigate("/products");
    }
  }, [state.isAuthenticated, navigate]);

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setEmailError(false);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setError("Enter a valid email address.");
      setEmailError(true);
      return;
    }

    if (password.length < 4) {
      setError("Password must be at least 4 characters.");
      return;
    }

    dispatch({ type: "LOGIN", payload: email });
    navigate("/products");
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <p className="login-card__eyebrow">Welcome Back</p>
        <h1 className="login-card__title">
          Sign in to<br />your<br />account
        </h1>
        <p className="login-card__subtitle">
          Access your cart and continue shopping.
        </p>

        {error && <div className="login-card__error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              type="text"
              className={`form-input ${emailError ? "form-input--error" : ""}`}
              placeholder="you@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError(false);
                setError("");
              }}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="form-input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
            />
          </div>

          <button type="submit" className="login-card__submit">
            Sign In →
          </button>
        </form>

        <p className="login-card__hint">
          Use any email + password (4+ chars) to sign in.
        </p>
      </div>
    </div>
  );
}
