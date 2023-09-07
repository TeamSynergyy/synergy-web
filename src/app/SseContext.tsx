import { createContext, useEffect, useRef, useState } from "react";
import { Event, EventSourcePolyfill } from "event-source-polyfill";
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
    console.log("SSE message received", event);
    // dispatch(sseMessageReceived(event));
  };
  useEffect(() => {
    if (!token) return;

    const eventSource = new EventSourcePolyfill(`${hostUrl}/subscribe`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    /*
      eventSource.onmessage = (event) => {
        console.log("SSE message received", event);
        dispatch(sseMessageReceived(event));
      };
      eventSource.onerror = (err) => console.error(err);
    
      addEventListener("sse", (event) => {
        console.log("SSE message received", event);
        dispatch(sseMessageReceived(event));
      });
      */

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
