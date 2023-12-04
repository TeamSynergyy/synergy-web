import { createContext, useEffect, useRef } from "react";
import {
  EventSourcePolyfill,
  MessageEvent,
  Event,
} from "event-source-polyfill";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentToken } from "./authSlice";
import { sseMessageReceived } from "./sseSlice";

interface SseContextProps {
  es: EventSourcePolyfill | null;
}

export const SseContext = createContext<SseContextProps>({
  es: null,
});

export const SseProvider = ({ children }: { children: JSX.Element }) => {
  const dispatch = useDispatch();
  const hostUrl = import.meta.env.VITE_API_URL;
  const token = useSelector(selectCurrentToken);
  const esRef = useRef<EventSourcePolyfill | null>(null);

  const sseHandler = (event: Event) => {
    const messageEvent = event as MessageEvent;
    console.log("SSE message received", messageEvent);
    if (messageEvent.data[0] !== "{") return;
    dispatch(sseMessageReceived(messageEvent));
  };

  useEffect(() => {
    if (!token) return;

    const eventSource = new EventSourcePolyfill(`${hostUrl}/subscribe`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
      heartbeatTimeout: 600000,
    });

    eventSource.addEventListener("sse", sseHandler);

    return () => {
      eventSource.removeEventListener("sse", sseHandler);
    };
  }, [hostUrl, token]);

  return (
    <SseContext.Provider value={{ es: esRef.current }}>
      {children}
    </SseContext.Provider>
  );
};
