import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const getBooksRequest = () =>
  axios.get(`${API}/books`);
