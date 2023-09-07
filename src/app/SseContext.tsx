import { createContext, useEffect, useRef } from "react";
import { EventSourcePolyfill } from "event-source-polyfill";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./authSlice";
export const SseContext = createContext({
  es: null as EventSourcePolyfill | null,
});

export const SseProvider = ({ children }: { children: JSX.Element }) => {
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

    es.onmessage = (e) => console.log(e);

    esRef.current = es;
  }, [hostUrl, token]);

  return (
    <SseContext.Provider value={{ es: esRef.current }}>
      {children}
    </SseContext.Provider>
  );
};
