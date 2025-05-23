import { Alert, Snackbar } from "@mui/material";
import { useState, createContext, useCallback } from "react";

export const ToastContext = createContext(null);

export const ToastContextProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("info");

  const showToast = useCallback((msg, sev = "info") => {
    setOpen(true);
    setMessage(msg);
    setSeverity(sev);
  }, []);

  const handleClose = (_, reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          severity={severity}
          sx={{
            lineHeight: "normal",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {message}
        </Alert>
      </Snackbar>
    </ToastContext.Provider>
  );
};
