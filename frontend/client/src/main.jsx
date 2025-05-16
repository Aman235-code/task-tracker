import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { UserProvider } from "./store/auth.jsx";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <UserProvider>
    {/* <StrictMode> */}
    <App />
    <ToastContainer />
    {/* </StrictMode> */}
  </UserProvider>
);
