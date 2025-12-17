// src/context/UIContext.jsx
import { createContext, useContext, useState, useCallback } from "react";
import { Snackbar, Alert } from "@mui/material";

const UIContext = createContext(null);

export const useUI = () => {
  const ctx = useContext(UIContext);
  if (!ctx) {
    throw new Error("useUI debe usarse dentro de un UIProvider");
  }
  return ctx;
};

export function UIProvider({ children }) {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info", // "success" | "error" | "warning" | "info"
  });

  const showMessage = useCallback((message, severity = "info") => {
    setSnackbar({ open: true, message, severity });
  }, []);

  const handleClose = () =>
    setSnackbar((prev) => ({
      ...prev,
      open: false,
    }));

  const value = {
    showSuccess: (msg) => showMessage(msg, "success"),
    showError: (msg) => showMessage(msg, "error"),
    showWarning: (msg) => showMessage(msg, "warning"),
    showInfo: (msg) => showMessage(msg, "info"),
  };

  return (
    <UIContext.Provider value={value}>
      {children}

      {/* Snackbar global */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </UIContext.Provider>
  );
}
