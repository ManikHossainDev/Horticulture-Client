import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "sonner";

// Define item type
export interface IWishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size: string;
  color: string;
  category: string;
}

// Define initial state type
interface WishlistState {
  wishlist: IWishlistItem[];
}

const initialState: WishlistState = {
  wishlist: [],
};

// Wishlist slice
export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    // Add an item to the wishlist
    addToWishlist: (state, action: PayloadAction<IWishlistItem>) => {
      const index = state.wishlist.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index >= 0) {
        toast.error(`${action.payload.name} is already in your wishlist`);
      } else {
        state.wishlist.push(action.payload);
        toast.success(`Added ${action.payload.name} to wishlist`);
      }
    },
    // Remove an item from the wishlist
    removeFromWishlist: (state, action: PayloadAction<string>) => {
      const index = state.wishlist.findIndex(
        (item) => item.id === action.payload
      );
      if (index >= 0) {
        const removedItem = state.wishlist.splice(index, 1)[0];
      } else {
        toast.error("Item not found in wishlist");
      }
    },
    // Clear the wishlist
    clearWishlist: (state) => {
      state.wishlist = [];
    },
  },
});

// Selectors
export const selectWishlist = (state: { wishlist: WishlistState }) =>
  state.wishlist.wishlist;

export const { addToWishlist, removeFromWishlist, clearWishlist } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;
