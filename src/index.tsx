import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { enableMocking } from "./mocks/browser";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

enableMocking().then(() => {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});
