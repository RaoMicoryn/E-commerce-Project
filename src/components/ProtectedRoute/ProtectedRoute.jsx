import { Navigate } from "react-router-dom";
import { useStore } from "../../context/StoreContext";

export default function ProtectedRoute({ children }) {
  const { state } = useStore();

  if (!state.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
