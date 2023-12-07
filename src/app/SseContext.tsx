import { createContext, useEffect, useRef, useState } from "react";
import {
  EventSourcePolyfill,
  MessageEvent,
  Event,
  EventSourcePolyfillInit,
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
  const lastEventIdRef = useRef<string | null>("null");

  const sseHandler = (event: Event) => {
    const messageEvent = event as MessageEvent;
    console.log("SSE message received", messageEvent);

    // Update the last event ID using a ref
    if (messageEvent.lastEventId) {
      lastEventIdRef.current = messageEvent.lastEventId;
    }

    console.log("lasteventid:", lastEventIdRef.current);

    if (messageEvent.data[0] !== "{") return;
    dispatch(sseMessageReceived(messageEvent));
  };

  useEffect(() => {
    if (!token) return;

    const headers: { [name: string]: string } = {
      Authorization: `Bearer ${token}`,
    };

    if (lastEventIdRef.current) {
      headers["Last-Event-ID"] = lastEventIdRef.current;
    }

    const eventSource = new EventSourcePolyfill(`${hostUrl}/api/v1/subscribe`, {
      headers,
      heartbeatTimeout: 10 * 60 * 1000,
    });

    eventSource.addEventListener("sse", sseHandler);

    esRef.current = eventSource;

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
