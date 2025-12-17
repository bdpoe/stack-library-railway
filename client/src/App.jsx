// src/App.jsx
import { useMemo, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Container,
} from "@mui/material";

import Navbar from "./components/Navbar";

import { AuthProvider, useAuth } from "./context/AuthContext";
import { TaskContextProvider } from "./context/TaskProvider";
import { ColorModeContext } from "./context/ColorModeContext";
import { UIProvider } from "./context/UIContext";

import LoginPage from "./pages/LoginPage";
import TasksPage from "./pages/TasksPage";
import TasksForm from "./pages/TaskForm";
import LoansPage from "./pages/LoansPage";
import LoanForm from "./pages/LoanForm";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

// 🔒 CUALQUIER USUARIO LOGUEADO
function PrivateRoute({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  return children;
}

// 🔒 SOLO BIBLIOTECARIO
function LibrarianRoute({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (user.role !== "librarian") return <Navigate to="/dashboard" />;
  return children;
}

// 📌 Rutas de la app (usa el contexto de Auth)
function AppRoutes() {
  const { user } = useAuth();

  return (
    <TaskContextProvider>
      <Routes>
        {/* Login */}
        <Route path="/login" element={<LoginPage />} />

        {/* Redirección según login */}
        <Route
          path="/"
          element={
            !user ? <Navigate to="/login" /> : <Navigate to="/dashboard" />
          }
        />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <LibrarianRoute>
              <Dashboard />
            </LibrarianRoute>
          }
        />

        {/* Libros */}
        <Route
          path="/books"
          element={
            <PrivateRoute>
              <TasksPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/books/new"
          element={
            <LibrarianRoute>
              <TasksForm />
            </LibrarianRoute>
          }
        />

        <Route
          path="/books/edit/:id"
          element={
            <LibrarianRoute>
              <TasksForm />
            </LibrarianRoute>
          }
        />

        {/* Préstamos */}
        <Route
          path="/loans"
          element={
            <LibrarianRoute>
              <LoansPage />
            </LibrarianRoute>
          }
        />

        <Route
          path="/loans/new"
          element={
            <LibrarianRoute>
              <LoanForm />
            </LibrarianRoute>
          }
        />

        <Route
          path="/loans/edit/:id"
          element={
            <LibrarianRoute>
              <LoanForm />
            </LibrarianRoute>
          }
        />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </TaskContextProvider>
  );
}

function App() {
  const [mode, setMode] = useState("light");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prev) => (prev === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: "#D97706", // amber-600
          },
          secondary: {
            main: "#0EA5E9", // sky-500
          },
          background: {
            default: mode === "light" ? "#f4e8d1" : "#020617",
            paper: mode === "light" ? "#ffffff" : "#020617",
          },
        },
        shape: {
          borderRadius: 16,
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        {/* Normaliza estilos + aplica fondo según tema */}
        <CssBaseline />

        <AuthProvider>
          <UIProvider>
            <div className="min-h-screen flex flex-col">
              <Navbar />

              {/* Diseño responsive premium */}
              <main className="flex-grow flex">
                <Container
                  maxWidth="lg"
                  sx={{
                    py: { xs: 3, md: 5 },
                  }}
                >
                  <AppRoutes />
                </Container>
              </main>

              <footer className="text-center py-4 text-slate-500 text-xs md:text-sm border-t bg-white/10 backdrop-blur">
                Biblioteca Escolar © 2025
              </footer>
            </div>
          </UIProvider>
        </AuthProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
