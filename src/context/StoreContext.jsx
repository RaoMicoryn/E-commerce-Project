import { createContext, useContext, useReducer } from "react";

// ─── INITIAL STATE ────────────────────────────────────────────────────────────

export const initialState = {
  user: null,
  isAuthenticated: false,
  cart: [],
  totalItems: 0,
  totalPrice: 0,
};

// ─── REDUCER ─────────────────────────────────────────────────────────────────

export function storeReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };

    case "LOGOUT":
      return { ...initialState };

    case "ADD_TO_CART": {
      const existing = state.cart.find((item) => item.id === action.payload.id);
      let newCart;

      if (existing) {
        // Increment quantity if already in cart (bonus: prevent duplicates)
        newCart = state.cart.map((item) =>
          item.id === action.payload.id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      } else {
        newCart = [...state.cart, { ...action.payload, qty: 1 }];
      }

      const totalItems = newCart.reduce((sum, item) => sum + item.qty, 0);
      const totalPrice = newCart.reduce(
        (sum, item) => sum + item.price * item.qty,
        0
      );

      return { ...state, cart: newCart, totalItems, totalPrice };
    }

    case "REMOVE_FROM_CART": {
      const newCart = state.cart.filter((item) => item.id !== action.payload);
      const totalItems = newCart.reduce((sum, item) => sum + item.qty, 0);
      const totalPrice = newCart.reduce(
        (sum, item) => sum + item.price * item.qty,
        0
      );

      return { ...state, cart: newCart, totalItems, totalPrice };
    }

    case "CLEAR_CART":
      return { ...state, cart: [], totalItems: 0, totalPrice: 0 };

    default:
      return state;
  }
}

// ─── CONTEXT ─────────────────────────────────────────────────────────────────

const StoreContext = createContext(null);

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(storeReducer, initialState);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
}
