// src/components/LoanCard.jsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

function LoanCard({ loan, computedStatus, onDelete, onReturn }) {
  const { user } = useAuth();

  const statusStyles = {
    activo: {
      bg: "bg-sky-100",
      text: "text-sky-700",
      icon: "📘",
      label: "Activo",
    },
    "por-vencer": {
      bg: "bg-amber-100",
      text: "text-amber-800",
      icon: "⏳",
      label: "Por vencer",
    },
    atrasado: {
      bg: "bg-rose-100",
      text: "text-rose-800",
      icon: "❌",
      label: "Atrasado",
    },
    devuelto: {
      bg: "bg-emerald-100",
      text: "text-emerald-700",
      icon: "✓",
      label: "Devuelto",
    },
  };

  const style = statusStyles[computedStatus] || statusStyles.activo;

  const formatDate = (d) => (d ? d.slice(0, 10) : "");

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.2 }}
      className="bg-white/90 dark:bg-slate-900 rounded-2xl border border-amber-200/60 dark:border-slate-700 shadow-sm p-4 flex flex-col gap-2"
    >
      {/* ESTADO */}
      <div className="flex justify-between items-center">
        <span
          className={`text-xs px-3 py-1 rounded-full flex items-center gap-1 font-semibold ${style.bg} ${style.text}`}
        >
          <span>{style.icon}</span>
          <span>{style.label}</span>
        </span>
      </div>

      {/* INFO */}
      <h3 className="font-semibold text-slate-800 dark:text-slate-100">
        {loan.bookTitle || "Libro sin título"}
      </h3>

      <p className="text-sm text-slate-600 dark:text-slate-300">
        Estudiante: <strong>{loan.studentName}</strong>
      </p>

      <p className="text-xs text-slate-500 dark:text-slate-400">
        Desde: {formatDate(loan.startDate)} · Hasta:{" "}
        {formatDate(loan.endDate)}
      </p>

      {/* ACCIONES (solo bibliotecario) */}
      {user?.role === "librarian" && (
        <div className="flex justify-end gap-2 mt-2">
          {computedStatus !== "devuelto" && (
            <button
              onClick={() => onReturn(loan.id)}
              className="text-xs px-3 py-1 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white"
            >
              Marcar devuelto
            </button>
          )}

          <Link
            to={`/loans/edit/${loan.id}`}
            className="text-xs px-3 py-1 rounded-full border border-amber-400 text-amber-700 hover:bg-amber-50 dark:hover:bg-slate-800"
          >
            Editar
          </Link>

          <button
            onClick={() => onDelete(loan.id)}
            className="text-xs px-3 py-1 rounded-full border border-rose-400 text-rose-600 hover:bg-rose-50 dark:hover:bg-slate-800"
          >
            Eliminar
          </button>
        </div>
      )}
    </motion.div>
  );
}

export default LoanCard;
