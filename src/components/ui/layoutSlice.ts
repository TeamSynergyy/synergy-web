import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  opened: false,
};

const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    toggleNavbar: (state) => {
      state.opened = !state.opened;
    },
    setNavbarOpen: (state, action) => {
      state.opened = action.payload;
    },
  },
});

export const { toggleNavbar, setNavbarOpen } = layoutSlice.actions;
export default layoutSlice.reducer;
