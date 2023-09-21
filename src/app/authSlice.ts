import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

const authSlice = createSlice({
  name: "auth",
  initialState: { token: null } as { token: string | null },
  reducers: {
    setCredentials: (state, { payload: token }: PayloadAction<string>) => {
      state.token = token;
      console.log("token", token);
    },
  },
});

export const { setCredentials } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentToken = (state: RootState) => state.auth.token;
