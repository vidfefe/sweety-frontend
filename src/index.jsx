import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import { AppContextProvider } from "./components/AppContext.jsx";
import { ThemeProvider } from "@mui/material";
import theme from "./theme.js";

ReactDOM.render(
  <React.StrictMode>
    <AppContextProvider>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </AppContextProvider>
  </React.StrictMode>,
  document.getElementById("root"),
);
