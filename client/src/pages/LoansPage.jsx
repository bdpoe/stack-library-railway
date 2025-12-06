// src/pages/LoansPage.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoanCard from "../components/LoanCard";
import { getLoansRequest, deleteLoanRequest } from "../api/loans.api";

function LoansPage() {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const loadLoans = async () => {
    try {
      setLoading(true);
      const res = await getLoansRequest();
      setLoans(res.data || []);
    } catch (error) {
      console.error(error);
      setErrorMsg("No se pudieron cargar los préstamos.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este préstamo?")) return;
    try {
      await deleteLoanRequest(id);
      // 👇 aquí usamos loan.id (MySQL), no loan._id
      setLoans((prev) => prev.filter((loan) => loan.id !== id));
    } catch (error) {
      console.error(error);
      alert("Error al eliminar el préstamo.");
    }
  };

  useEffect(() => {
    loadLoans();
  }, []);

  if (loading) {
    return <p className="text-slate-600">Cargando préstamos...</p>;
  }

  return (
    <section className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800">
          Préstamos de libros
        </h1>
        <Link
          to="/loans/new"
          className="bg-emerald-500 text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-emerald-600"
        >
          + Nuevo préstamo
        </Link>
      </div>

      {errorMsg && (
        <p className="text-sm text-rose-600 bg-rose-50 border border-rose-100 rounded-lg px-3 py-2">
          {errorMsg}
        </p>
      )}

      {loans.length === 0 ? (
        <p className="text-slate-600">Todavía no hay préstamos registrados.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.isArray(loans) &&
            loans.map((loan) => (
              // 👇 key con loan.id (MySQL)
              <LoanCard key={loan.id} loan={loan} onDelete={handleDelete} />
            ))}
        </div>
      )}
    </section>
  );
}

export default LoansPage;
