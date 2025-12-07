import { Routes, Route, Navigate } from "react-router-dom";

import TasksPage from "./pages/TasksPage";
import TasksForm from "./pages/TaskForm";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";

import { TaskContextProvider } from "./context/TaskProvider";
import { AuthProvider, useAuth } from "./context/AuthContext";

import LoginPage from "./pages/LoginPage";
import LoansPage from "./pages/LoansPage";
import LoanForm from "./pages/LoanForm";

// 🔒 Rutas protegidas solo para bibliotecarios
function LibrarianRoute({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (user.role !== "librarian") return <Navigate to="/" />; // Estudiante no puede entrar
  return children;
}

// 🔒 Rutas protegidas para cualquier usuario autenticado
function PrivateRoute({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  return children;
}

function AppRoutes() {
  const { user } = useAuth();

  return (
    <TaskContextProvider>
      <Routes>
        {/* LOGIN */}
        <Route path="/login" element={<LoginPage />} />

        {/* HOME SEGÚN ROL */}
        <Route
          path="/"
          element={
            !user ? (
              <Navigate to="/login" />
            ) : user.role === "librarian" ? (
              <>
                {/* Home del bibliotecario */}
                <LoansPage />
              </>
            ) : (
              <>
                {/* Home del estudiante */}
                <TasksPage />
              </>
            )
          }
        />

        {/* 📚 LOANS — Solo bibliotecario */}
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

        {/* 📝 TASKS — Estudiante y bibliotecario pueden ver */}
        <Route
          path="/tasks"
          element={
            <PrivateRoute>
              <TasksPage />
            </PrivateRoute>
          }
        />

        {/* Crear/Editar tareas — SOLO bibliotecario */}
        <Route
          path="/tasks/new"
          element={
            <LibrarianRoute>
              <TasksForm />
            </LibrarianRoute>
          }
        />

        <Route
          path="/tasks/edit/:id"
          element={
            <LibrarianRoute>
              <TasksForm />
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
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gradient-to-b from-sky-100 via-sky-200 to-emerald-50 text-slate-800 flex flex-col">
        <Navbar />

        <div className="flex-grow container mx-auto px-4 md:px-10 py-8">
          <AppRoutes />
        </div>

        <footer className="text-center py-4 text-slate-500 text-xs md:text-sm border-t border-sky-100 bg-white/60 backdrop-blur"></footer>
      </div>
    </AuthProvider>
  );
}

export default App;
