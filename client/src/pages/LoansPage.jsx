// src/pages/LoansPage.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import {
  getLoansRequest,
  deleteLoanRequest,
  updateLoanRequest,
} from "../api/loans.api";

import LoanCard from "../components/LoanCard";
import FilterBar from "../components/FilterBar";

import { Pagination, Stack } from "@mui/material";

function LoansPage() {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("todos"); // todos | activo | por-vencer | atrasado | devuelto
  const [page, setPage] = useState(1);
  const rowsPerPage = 6;

  const navigate = useNavigate();
  const { user } = useAuth();
  const isLibrarian = user?.role === "librarian";

  // 🔹 Cargar préstamos
  const loadLoans = async () => {
    try {
      const res = await getLoansRequest();
      setLoans(res.data || []);
    } catch (err) {
      console.error("❌ Error cargando préstamos:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLoans();
  }, []);

  // =========================
  // 📅 ESTADO CALCULADO
  // =========================
  const getComputedStatus = (loan) => {
    if (loan.status === "devuelto") return "devuelto";
    if (!loan.endDate) return "activo";

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const end = new Date(loan.endDate);
    end.setHours(0, 0, 0, 0);

    if (end < today) return "atrasado";

    const diffDays = (end - today) / (1000 * 60 * 60 * 24);
    if (diffDays <= 3) return "por-vencer";

    return "activo";
  };

  // =========================
  // 🔔 ALERTAS SUPERIORES
  // =========================
  const overdueLoans = loans.filter(
    (l) => getComputedStatus(l) === "atrasado"
  );

  const dueSoonLoans = loans.filter(
    (l) => getComputedStatus(l) === "por-vencer"
  );

  // =========================
  // 🔍 FILTRADO
  // =========================
  const filteredLoans =
    filter === "todos"
      ? loans
      : loans.filter((l) => getComputedStatus(l) === filter);

  // 🔹 Paginación
  const paginated = filteredLoans.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  // 🔹 Eliminar préstamo
  const handleDelete = async (id) => {
    if (!confirm("¿Eliminar préstamo?")) return;
    await deleteLoanRequest(id);
    loadLoans();
  };

  // 🔹 Marcar devuelto
  const handleReturn = async (id) => {
    await updateLoanRequest(id, { status: "devuelto" });
    loadLoans();
  };

  if (loading) return <p>Cargando préstamos...</p>;

  return (
    <div className="max-w-5xl mx-auto">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold text-amber-900 dark:text-amber-400">
          Gestión de Préstamos
        </h1>

        {isLibrarian && (
          <button
            onClick={() => navigate("/loans/new")}
            className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-4 py-2 rounded-lg transition"
          >
            + Nuevo Préstamo
          </button>
        )}
      </div>

      {/* 🔔 ALERTAS */}
      {isLibrarian && (overdueLoans.length > 0 || dueSoonLoans.length > 0) && (
        <div className="mb-4 space-y-2">
          {overdueLoans.length > 0 && (
            <div className="bg-rose-100 border border-rose-300 text-rose-800 px-4 py-2 rounded-lg text-sm">
              ❌ Hay <strong>{overdueLoans.length}</strong> préstamo(s)
              atrasado(s).
            </div>
          )}

          {dueSoonLoans.length > 0 && (
            <div className="bg-amber-100 border border-amber-300 text-amber-800 px-4 py-2 rounded-lg text-sm">
              ⏳ Hay <strong>{dueSoonLoans.length}</strong> préstamo(s) por
              vencer en los próximos 3 días.
            </div>
          )}
        </div>
      )}

      {/* FILTRO */}
      <FilterBar filter={filter} setFilter={setFilter} />

      {/* LISTADO */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {paginated.map((loan) => (
          <LoanCard
            key={loan.id}
            loan={loan}
            computedStatus={getComputedStatus(loan)}
            onDelete={handleDelete}
            onReturn={handleReturn}
          />
        ))}
      </div>

      {/* PAGINACIÓN */}
      <Stack spacing={2} sx={{ mt: 4 }} alignItems="center">
        <Pagination
          count={Math.ceil(filteredLoans.length / rowsPerPage)}
          page={page}
          onChange={(e, value) => setPage(value)}
          color="primary"
        />
      </Stack>
    </div>
  );
}

export default LoansPage;
