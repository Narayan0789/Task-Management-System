import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx"; 
import "./styles/auth.css";  // ✅ uncomment this

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);