import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChatMessage } from "types";

interface SocketState {
  messages: ChatMessage[];
}

const initialState: SocketState = {
  messages: [],
};

export const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    messageReceived: (state, action: PayloadAction<ChatMessage>) => {
      console.log("messageReceived", action.payload);
      state.messages.push(action.payload);
    },
  },
});

export const { messageReceived } = socketSlice.actions;

export default socketSlice.reducer;
