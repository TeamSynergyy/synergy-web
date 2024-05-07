import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Message {
  roomId: string;
  senderId: string;
  sendTime: string;
  message: string;
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
      console.log("messageReceived", action.payload);
      state.messages.push(action.payload);
    },
  },
});

export const { messageReceived } = socketSlice.actions;

export default socketSlice.reducer;
