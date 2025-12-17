import axios from "axios";

const API = import.meta.env.VITE_API_URL;

// GET all loans
export const getLoansRequest = () => axios.get(`${API}/loans`);

// GET one loan
export const getLoanRequest = (id) => axios.get(`${API}/loans/${id}`);

// CREATE loan
export const createLoanRequest = (loan) =>
  axios.post(`${API}/loans`, {
    bookTitle: loan.bookTitle,
    studentName: loan.studentName,
    startDate: loan.startDate,
    endDate: loan.endDate,
    status: loan.status || "activo",
  });

// UPDATE loan
export const updateLoanRequest = (id, loan) =>
  axios.put(`${API}/loans/${id}`, {
    bookTitle: loan.bookTitle,
    studentName: loan.studentName,
    startDate: loan.startDate,
    endDate: loan.endDate,
    status: loan.status,
  });

// DELETE loan
export const deleteLoanRequest = (id) =>
  axios.delete(`${API}/loans/${id}`);
