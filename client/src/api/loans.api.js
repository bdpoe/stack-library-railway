import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const getLoansRequest = () => axios.get(`${API}/loans`);

export const getLoanRequest = (id) => axios.get(`${API}/loans/${id}`);

export const createLoanRequest = (loanData) =>
  axios.post(`${API}/loans`, loanData);

export const updateLoanRequest = (id, loanData) =>
  axios.put(`${API}/loans/${id}`, loanData);

export const deleteLoanRequest = (id) =>
  axios.delete(`${API}/loans/${id}`);
