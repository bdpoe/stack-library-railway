import { motion } from "framer-motion";

function BookDetailModal({ book, onClose }) {
  if (!book) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="
          bg-white dark:bg-slate-900
          max-w-md w-full mx-4
          rounded-2xl p-6
          overflow-y-auto max-h-[90vh]
        "
      >
        {/* Imagen */}
        {book.image && (
          <img
            src={book.image}
            alt={book.title}
            className="w-full h-64 object-cover rounded-xl mb-4"
          />
        )}

        {/* Título */}
        <h2 className="text-2xl font-bold mb-2 text-slate-800 dark:text-white">
          {book.title}
        </h2>

        {/* Estado */}
        <span
          className={`inline-block mb-4 px-3 py-1 rounded-full text-sm font-semibold
            ${book.done ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}
          `}
        >
          {book.done ? "PRESTADO" : "DISPONIBLE"}
        </span>

        {/* Descripción */}
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          {book.description}
        </p>

        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="mt-6 w-full bg-amber-600 hover:bg-amber-700 text-white py-2 rounded-lg"
        >
          Cerrar
        </button>
      </motion.div>
    </div>
  );
}

export default BookDetailModal;
