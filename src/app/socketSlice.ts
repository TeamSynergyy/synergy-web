import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Message {
  topic: string;
  body: string;
}

interface SocketState {
  messages: Message[];
}

const initialState: SocketState = {
  messages: [],
};

export const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    messageReceived: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },
  },
});

export const { messageReceived } = socketSlice.actions;

export default socketSlice.reducer;
