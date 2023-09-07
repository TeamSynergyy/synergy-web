import { createContext, useEffect, useRef } from "react";
import { EventSourcePolyfill } from "event-source-polyfill";
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

  useEffect(() => {
    if (!token) return;
    const es = new EventSourcePolyfill(`${hostUrl}/subscribe`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });

    es.onmessage = (event) => {
      console.log("SSE message received", event);
      dispatch(sseMessageReceived(event));
    };

    es.onerror = (err) => console.error(err);

    esRef.current = es;

    return () => {
      es.close();
    };
  }, [hostUrl, token]);

  return (
    <SseContext.Provider value={{ es: esRef.current }}>
      {children}
    </SseContext.Provider>
  );
};
