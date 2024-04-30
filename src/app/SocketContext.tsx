import { createContext, useEffect, useRef } from "react";
import io, { Socket } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { messageReceived } from "app/socketSlice";
import { api } from "./api";
import { selectCurrentToken } from "./authSlice";

export const SocketContext = createContext<Socket | null>(null);

export const SocketProvider = ({ children }: { children: JSX.Element }) => {
  const dispatch = useDispatch();
  const token = useSelector(selectCurrentToken);
  const { data: chatRooms } = api.useGetMyChatRoomsQuery(null);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io(import.meta.env.VITE_WEBSOCKET_URL, {
        query: { token },
      });
    }

    socketRef.current.on("message", (topic, message) => {
      dispatch(messageReceived({ topic, body: message }));
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, [token, dispatch, chatRooms]);

  return (
    <SocketContext.Provider value={socketRef.current}>
      {children}
    </SocketContext.Provider>
  );
};
