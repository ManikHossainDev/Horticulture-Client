import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie"; // For handling cookies

interface AuthState {
  user: Record<string, unknown> | null;
  token: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loggedUser: (
      state,
      action: PayloadAction<{
        user: AuthState["user"];
        token: string;
        refreshToken: string;
      }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      // Save user and token to cookies (client-side)
      Cookies.set("user", JSON.stringify(action.payload.user), { expires: 7 });
      Cookies.set("token", action.payload.token, { expires: 7 });
    },
    logoutUser: (state) => {
      state.user = null;
      state.token = null;
      Cookies.remove("user");
      Cookies.remove("token");
    },
    updatedUser: (state, action: PayloadAction<AuthState["user"]>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
  },
});

export const { loggedUser, logoutUser, updatedUser } = authSlice.actions;
export default authSlice.reducer;
