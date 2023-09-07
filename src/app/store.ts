import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api";
import stompReducer from "./stompSlice";
import { useDispatch } from "react-redux";
import authReducer from "./authSlice";
import sseReducer from "./sseSlice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    stomp: stompReducer,
    auth: authReducer,
    sse: sseReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
