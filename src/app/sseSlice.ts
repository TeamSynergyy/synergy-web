import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MessageEvent } from "event-source-polyfill";

interface SseState {
  messageEvents: MessageEvent[];
}

const initialState: SseState = {
  messageEvents: [],
};

export const sseSlice = createSlice({
  name: "sse",
  initialState,
  reducers: {
    sseMessageReceived: (state, action: PayloadAction<MessageEvent>) => {
      state.messageEvents.push(action.payload);
    },
  },
});

export const { sseMessageReceived } = sseSlice.actions;

export default sseSlice.reducer;
