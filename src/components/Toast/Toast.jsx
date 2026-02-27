import "./Toast.css";

export default function Toast({ message }) {
  if (!message) return null;

  return (
    <div className="toast">
      <span className="toast__dot" />
      <span className="toast__text">
        <strong>{message}</strong> added to cart
      </span>
    </div>
  );
}
