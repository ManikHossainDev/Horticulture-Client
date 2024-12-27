import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "sonner";

// Define item type
export interface ICartItem {
  id: string;
  name: string;
  price: number;
  totalPrice: number;
  image: string;
  size: string;
  color: string;
  category: string;
  quantity: number;
}

// Define initial state type
interface CartState {
  cart: ICartItem[];
  totalPrice: number;
  totalCount: number;
}

const initialState: CartState = {
  cart: [],
  totalPrice: 0,
  totalCount: 0,
};

// Helper function to calculate the cart's total price
const calculateCartTotalPrice = (cart: ICartItem[]) =>
  parseFloat(
    cart.reduce((total, item) => total + item.totalPrice, 0).toFixed(2)
  );

// Helper function to calculate the cart's total count
const calculateCartTotalCount = (cart: ICartItem[]) =>
  cart.reduce((total, item) => total + item.quantity, 0);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<Omit<ICartItem, "totalPrice">>
    ) => {
      const index = state?.cart?.findIndex(
        (item) =>
          item.id === action.payload.id &&
          item.size === action.payload.size &&
          item.color === action.payload.color
      );
      if (index >= 0) {
        // Update quantity and individual totalPrice for the existing item
        state.cart[index].quantity += action.payload.quantity;
        state.cart[index].totalPrice = parseFloat(
          (state.cart[index].price * state.cart[index].quantity).toFixed(2)
        );
        toast.success(`Updated ${state.cart[index].name} in the cart`);
      } else {
        // Add new item with initial totalPrice
        const newItem: ICartItem = {
          ...action.payload,
          totalPrice: parseFloat(
            (action.payload.price * action.payload.quantity).toFixed(2)
          ),
        };
        state?.cart?.push(newItem);
        toast.success(`Added ${newItem.name} to the cart`);
      }
      // Update cart's overall total price and total count
      state.totalPrice = calculateCartTotalPrice(state.cart);
      state.totalCount = calculateCartTotalCount(state.cart);
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const index = state.cart.findIndex((item) => item.id === action.payload);
      if (index >= 0) {
        const removedItem = state.cart.splice(index, 1)[0];
        toast.success(`Removed ${removedItem.name} from cart`);
      } else {
        toast.error("Item not found in cart");
      }
      // Update cart's overall total price and total count
      state.totalPrice = calculateCartTotalPrice(state.cart);
      state.totalCount = calculateCartTotalCount(state.cart);
    },
    incrementQuantity: (state, action: PayloadAction<string>) => {
      const index = state.cart.findIndex((item) => item.id === action.payload);
      if (index >= 0) {
        state.cart[index].quantity += 1;
        state.cart[index].totalPrice = parseFloat(
          (state.cart[index].price * state.cart[index].quantity).toFixed(2)
        );
        toast.success(`Increased quantity of ${state.cart[index].name}`);
      } else {
        toast.error("Item not found in cart");
      }
      // Update cart's overall total price and total count
      state.totalPrice = calculateCartTotalPrice(state.cart);
      state.totalCount = calculateCartTotalCount(state.cart);
    },
    decrementQuantity: (state, action: PayloadAction<string>) => {
      const index = state.cart.findIndex((item) => item.id === action.payload);
      if (index >= 0 && state.cart[index].quantity > 1) {
        state.cart[index].quantity -= 1;
        state.cart[index].totalPrice = parseFloat(
          (state.cart[index].price * state.cart[index].quantity).toFixed(2)
        );
        toast.success(`Decreased quantity of ${state.cart[index].name}`);
      } else if (index >= 0) {
        const removedItem = state.cart.splice(index, 1)[0];
        toast.success(`Removed ${removedItem.name} from cart`);
      } else {
        toast.error("Item not found in cart");
      }
      // Update cart's overall total price and total count
      state.totalPrice = calculateCartTotalPrice(state.cart);
      state.totalCount = calculateCartTotalCount(state.cart);
    },
    clearCart: (state) => {
      state.cart = [];
      state.totalPrice = 0;
      state.totalCount = 0;
    },
  },
});

// Selectors
export const selectCart = (state: { cart: CartState }) => state.cart.cart;
export const selectTotalPrice = (state: { cart: CartState }) =>
  state.cart.totalPrice;
export const selectTotalCount = (state: { cart: CartState }) =>
  state.cart.totalCount; // Selector for totalCount

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart, // Export the clearCart action
} = cartSlice.actions;
export default cartSlice.reducer;
