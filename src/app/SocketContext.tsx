import { createContext, useEffect, useRef } from "react";
import io, { Socket } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { messageReceived } from "app/socketSlice";
import { api } from "./api";
import { selectCurrentToken } from "./authSlice";

export const SocketContext = createContext<Socket | null>(null);

export const SocketProvider = ({ children }: { children: JSX.Element }) => {
  const dispatch = useDispatch();
  // const token = useSelector(selectCurrentToken);
  // const { data: chatRooms } = api.useGetMyChatRoomsQuery(null);
  const socketRef = useRef<Socket | null>(null);

  if (!socketRef.current) {
    socketRef.current = io(import.meta.env.VITE_WEBSOCKET_URL, {
      transports: ["websocket"],
    });
  }

  socketRef.current.on("chat message", (m) => {
    dispatch(messageReceived(m));
  });

  // useEffect(() => {
  //   if (!socketRef.current) {
  //     socketRef.current = io(import.meta.env.VITE_WEBSOCKET_URL, {
  //       transports: ["websocket"],
  //     });
  //   }

  //   socketRef.current.on("chat message", (m) => {
  //     dispatch(messageReceived(m));
  //   });

  //   return () => {
  //     socketRef.current?.off("chat message");
  //     socketRef.current?.close();
  //   };
  // }, [token, dispatch]);

  return (
    <SocketContext.Provider value={socketRef.current}>
      {children}
    </SocketContext.Provider>
  );
};
