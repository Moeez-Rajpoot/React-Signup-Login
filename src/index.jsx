import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { UserProvider } from "./Context/UserContext.jsx";
import { SnackbarProvider } from 'notistack'
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <SnackbarProvider>
      <App />
      </SnackbarProvider>
    </UserProvider>
  </React.StrictMode>
);
