import App from "App";
import { store } from "app/store";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

if (import.meta.env.DEV) {
  const { worker } = await import("./mocks/browser");
  worker.start();
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
