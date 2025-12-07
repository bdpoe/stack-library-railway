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
  if (user.role !== "librarian") return <Navigate to="/" />;
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
              <LoansPage />
            ) : (
              <TasksPage />
            )
          }
        />

        {/* 📚 LIBROS (TASKS) */}
        <Route
          path="/tasks"
          element={
            <PrivateRoute>
              <TasksPage />
            </PrivateRoute>
          }
        />

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

        {/* 📖 PRÉSTAMOS (solo bibliotecario) */}
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
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gradient-to-bfrom-amber-50 via-amber-100 to-stone-100 text-slate-800 flex flex-col">
        <Navbar />

        <div className="flex-growcontainer mx-auto px-4 md:px-10 py-8">
          <AppRoutes />
        </div>

        <footer className="text-center py-4 text-stone-500 text-xs md:text-sm border-t border-amber-100 bg-white/70 backdrop-blur"></footer>
      </div>
    </AuthProvider>
  );
}

export default App;
