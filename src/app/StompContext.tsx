import { createContext, useEffect, useState, useRef } from "react";
import { Client } from "@stomp/stompjs";
import { useDispatch } from "react-redux";
import { messageReceived } from "app/stompSlice";
import { api } from "./api";

interface StompContextProps {
  client: Client | null;
}

export const StompContext = createContext<StompContextProps>({ client: null });

export const StompProvider = ({ children }: { children: JSX.Element }) => {
  const dispatch = useDispatch();
  const brokerURL = import.meta.env.VITE_WEBSOCKET_URL;
  const { data: chatRooms } = api.useGetMyChatRoomsQuery(null);

  const topics = chatRooms?.map(({ roomId }) => `/topic/${roomId}`) || [];

  const clientRef = useRef<Client | null>(null);
  const isConnected = clientRef.current?.connected;
  const makeSubscriptions = () =>
    topics.map((topic) =>
      clientRef.current?.subscribe(
        topic,
        (message) => {
          dispatch(messageReceived({ topic, body: message.body }));
        },
        { id: topic }
      )
    );

  useEffect(() => {
    if (!clientRef.current) {
      console.log("create new client");
      clientRef.current = new Client({
        brokerURL,
        reconnectDelay: 5000,
      });

      clientRef.current.activate();
      return;
    }

    if (!isConnected) {
      clientRef.current.onConnect = makeSubscriptions;

      return () => {
        topics.forEach((topic) => {
          clientRef.current?.unsubscribe(topic);
        });
      };
    }

    if (isConnected) {
      const subscriptions = makeSubscriptions();

      return () => {
        subscriptions.forEach((subscription) => {
          console.log(subscription);
          subscription?.unsubscribe();
        });
      };
    }
  }, [chatRooms?.length]);

  return (
    <StompContext.Provider value={{ client: clientRef.current }}>
      {children}
    </StompContext.Provider>
  );
};
