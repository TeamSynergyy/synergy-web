import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface AuthState {
  token: string | null;
}

const initialState: AuthState = {
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
});

export const { setAccessToken } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentToken = (state: RootState) => state.auth.token;
