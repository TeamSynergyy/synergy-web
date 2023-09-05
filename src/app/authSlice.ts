import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

const slice = createSlice({
  name: "auth",
  initialState: { token: null } as { token: string | null },
  reducers: {
    setCredentials: (
      state,
      { payload: { token } }: PayloadAction<{ token: string }>
    ) => {
      localStorage.setItem("token", token); // 임시 로그인
      state.token = token;
    },
  },
});

export const { setCredentials } = slice.actions;

export default slice.reducer;

export const selectCurrentToken = (state: RootState) => state.auth.token;
