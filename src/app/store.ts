import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api";
import socketReducer from "./socketSlice";
import { useDispatch } from "react-redux";
import authReducer from "./authSlice";
import sseReducer from "./sseSlice";
import layoutReducer from "components/ui/layoutSlice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    socket: socketReducer,
    auth: authReducer,
    sse: sseReducer,
    layout: layoutReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
