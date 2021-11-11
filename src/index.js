import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import ColorProvider from "./contexts/ColorContext";

ReactDOM.render(
  <React.StrictMode>
    <ColorProvider>
      <App />
    </ColorProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
