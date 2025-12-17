// src/components/SearchBar.jsx
import { TextField } from "@mui/material";

export default function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <TextField
      label="Buscar libro"
      variant="outlined"
      fullWidth
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      sx={{ mb: 2 }}
    />
  );
}
