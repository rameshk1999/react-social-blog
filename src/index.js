import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import ColorProvider from "./contexts/ColorContext";
import { SnackbarProvider } from "notistack";

ReactDOM.render(
  <React.StrictMode>
    <ColorProvider>
      <SnackbarProvider maxSnack={3}>
        <App />
      </SnackbarProvider>
    </ColorProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
