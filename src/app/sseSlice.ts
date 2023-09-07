import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NotificationMessage {
  type: string;
  data: string;
}

interface SseState {
  messages: NotificationMessage[];
}

const initialState: SseState = {
  messages: [],
};

export const sseSlice = createSlice({
  name: "sse",
  initialState,
  reducers: {
    sseMessageReceived: (state, action: PayloadAction<NotificationMessage>) => {
      state.messages.push(action.payload);
    },
  },
});

export const { sseMessageReceived } = sseSlice.actions;

export default sseSlice.reducer;
