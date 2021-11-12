import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import ColorProvider from "./contexts/ColorContext";
import { SnackbarProvider } from "notistack";
import { BrowserRouter } from "react-router-dom";
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ColorProvider>
        <SnackbarProvider maxSnack={3}>
          <App />
        </SnackbarProvider>
      </ColorProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
