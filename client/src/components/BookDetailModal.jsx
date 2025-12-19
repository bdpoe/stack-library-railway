import { motion, AnimatePresence } from "framer-motion";

function BookDetailModal({ task, onClose }) {
  if (!task) return null;

  const isPrestado = task.done === 1;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        {/* CONTENEDOR */}
        <motion.div
          onClick={(e) => e.stopPropagation()}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="
            bg-white dark:bg-slate-900
            rounded-2xl
            shadow-xl
            max-w-2xl
            w-full
            max-h-[90vh]
            overflow-y-auto
            p-6
          "
        >
          {/* IMAGEN */}
          {task.image && (
            <div className="flex justify-center mb-6">
              <img
                src={task.image}
                alt={task.title}
                className="
                  max-h-[420px]
                  w-auto
                  object-contain
                  rounded-xl
                  shadow-lg
                  bg-slate-100 dark:bg-slate-800
                  p-2
                "
              />
            </div>
          )}

          {/* TÍTULO */}
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
            {task.title}
          </h2>

          {/* ESTADO */}
          <span
            className={`inline-block mb-4 px-3 py-1 rounded-full text-xs font-bold ${
              isPrestado
                ? "bg-red-100 text-red-700"
                : "bg-emerald-100 text-emerald-700"
            }`}
          >
            {isPrestado ? "PRESTADO" : "DISPONIBLE"}
          </span>

          {/* DESCRIPCIÓN COMPLETA */}
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 whitespace-pre-line">
            {task.description || "Sin descripción"}
          </p>

          {/* BOTÓN */}
          <div className="mt-6 text-right">
            <button
              onClick={onClose}
              className="
                bg-slate-200 hover:bg-slate-300
                dark:bg-slate-700 dark:hover:bg-slate-600
                text-slate-900 dark:text-white
                px-4 py-2 rounded-lg
              "
            >
              Cerrar
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default BookDetailModal;
