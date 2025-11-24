import { createContext, useContext, useState } from "react";
import axios from "axios";

const LoansContext = createContext();

export const useLoans = () => useContext(LoansContext);

export function LoansProvider({ children }) {
  const [loans, setLoans] = useState([]);

  const API = import.meta.env.VITE_API_URL;

  const loadLoans = async () => {
    const res = await axios.get(`${API}/loans`);
    setLoans(res.data);
  };

  const createLoan = async (loan) => {
    const res = await axios.post(`${API}/loans`, loan);
    setLoans([...loans, res.data]);
  };

  const updateLoan = async (id, updates) => {
    await axios.put(`${API}/loans/${id}`, updates);
    loadLoans();
  };

  const returnLoan = async (id) => {
    await axios.put(`${API}/loans/${id}/return`);
    loadLoans();
  };

  const deleteLoan = async (id) => {
    await axios.delete(`${API}/loans/${id}`);
    setLoans(loans.filter((loan) => loan.id !== id));
  };

  return (
    <LoansContext.Provider
      value={{ loans, loadLoans, createLoan, updateLoan, deleteLoan, returnLoan }}
    >
      {children}
    </LoansContext.Provider>
  );
}
