import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { AppContextProvider } from "./components/AppContext.jsx";
import { ThemeProvider } from "@mui/material";
import theme from "./theme.js";
import { ToastContextProvider } from "./components/ToastContext.jsx";

createRoot(document.getElementById("root")).render(
  <AppContextProvider>
    <ThemeProvider theme={theme}>
      <ToastContextProvider>
        <App />
      </ToastContextProvider>
    </ThemeProvider>
  </AppContextProvider>,
);
