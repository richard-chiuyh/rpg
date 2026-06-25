import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app";
import "./style.css";

const root = document.getElementById("app");

if (!root) {
  throw new Error("Mount point #app was not found.");
}

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>
);
