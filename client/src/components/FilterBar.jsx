// src/components/FilterBar.jsx
import { MenuItem, TextField } from "@mui/material";

export default function FilterBar({ filter, setFilter }) {
  return (
    <TextField
      select
      label="Filtrar por estado"
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
      fullWidth
      sx={{ mb: 2 }}
    >
      {/* TODOS */}
      <MenuItem value="todos">Todos</MenuItem>

      {/* ESTADOS */}
      <MenuItem value="devuelto">Devuelto</MenuItem>
      <MenuItem value="atrasado">Atrasado</MenuItem>
    </TextField>
  );
}
