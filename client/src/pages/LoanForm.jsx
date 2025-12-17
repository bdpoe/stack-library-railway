// src/pages/LoanForm.jsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  createLoanRequest,
  getLoanRequest,
  updateLoanRequest,
} from "../api/loans.api";

import {
  getAvailableTasksRequest,
  toggleTaskRequest,
} from "../api/tasks.api";

function LoanForm() {
  const navigate = useNavigate();
  const params = useParams();

  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState([]);

  const [loan, setLoan] = useState({
    bookId: "",
    bookTitle: "",
    studentName: "",
    startDate: "",
    endDate: "",
  });

  const cleanDate = (date) => (date ? date.split("T")[0] : "");

  useEffect(() => {
    async function loadBooks() {
      const res = await getAvailableTasksRequest();
      setBooks(res.data || []);
    }
    loadBooks();
  }, []);

  useEffect(() => {
    async function loadLoan() {
      if (!params.id) return;
      const res = await getLoanRequest(params.id);
      const data = res.data;

      setLoan({
        bookId: data.bookId || "",
        bookTitle: data.bookTitle || "",
        studentName: data.studentName,
        startDate: cleanDate(data.startDate),
        endDate: cleanDate(data.endDate),
      });
    }
    loadLoan();
  }, [params.id]);

  const handleChange = (e) => {
    setLoan({ ...loan, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (params.id) {
        await updateLoanRequest(params.id, loan);
      } else {
        await createLoanRequest(loan);
        await toggleTaskRequest(loan.bookId);
      }
      navigate("/loans");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        max-w-lg mx-auto
        bg-white dark:bg-slate-800
        p-6 rounded-xl shadow
        border border-amber-300 dark:border-slate-700
      "
    >
      <h1 className="text-3xl font-bold text-amber-900 dark:text-amber-400 mb-4">
        {params.id ? "Editar Préstamo" : "Nuevo Préstamo"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* LIBRO */}
        <div>
          <label className="font-semibold dark:text-slate-200">Libro</label>
          {params.id ? (
            <input
              value={loan.bookTitle}
              disabled
              className="w-full border p-2 rounded-lg bg-gray-100 dark:bg-slate-900 dark:text-slate-200 dark:border-slate-600"
            />
          ) : (
            <select
              name="bookId"
              value={loan.bookId}
              onChange={(e) => {
                const selected = books.find(
                  (b) => b.id === Number(e.target.value)
                );
                setLoan({
                  ...loan,
                  bookId: e.target.value,
                  bookTitle: selected?.title || "",
                });
              }}
              required
              className="w-full border p-2 rounded-lg bg-white dark:bg-slate-900 dark:text-slate-200 dark:border-slate-600"
            >
              <option value="">Seleccione un libro</option>
              {books.map((book) => (
                <option key={book.id} value={book.id}>
                  {book.title}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* ALUMNO */}
        <div>
          <label className="font-semibold dark:text-slate-200">Alumno</label>
          <input
            name="studentName"
            value={loan.studentName}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg bg-white dark:bg-slate-900 dark:text-slate-200 dark:border-slate-600"
            required
          />
        </div>

        {/* FECHAS */}
        <div>
          <label className="font-semibold dark:text-slate-200">
            Fecha Préstamo
          </label>
          <input
            type="date"
            name="startDate"
            value={loan.startDate}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg bg-white dark:bg-slate-900 dark:text-slate-200 dark:border-slate-600"
            required
          />
        </div>

        <div>
          <label className="font-semibold dark:text-slate-200">
            Fecha Devolución
          </label>
          <input
            type="date"
            name="endDate"
            value={loan.endDate}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg bg-white dark:bg-slate-900 dark:text-slate-200 dark:border-slate-600"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-amber-700 hover:bg-amber-800 text-white px-4 py-2 rounded-lg w-full transition"
        >
          {loading ? "Guardando..." : "Guardar"}
        </button>
      </form>
    </div>
  );
}

export default LoanForm;
