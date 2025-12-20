// src/components/Navbar.jsx
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Stack,
  useTheme,
  Tooltip,
} from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

import { useAuth } from "../context/AuthContext";
import { useColorMode } from "../context/ColorModeContext";

function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const { toggleColorMode } = useColorMode();

  const isDark = theme.palette.mode === "dark";
  const isLibrarian = user?.role === "librarian";

  const isActive = (path) => location.pathname.startsWith(path);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      color="transparent"
      sx={{
        borderBottom: "1px solid",
        borderColor: "divider",
        backdropFilter: "blur(12px)",
        backgroundColor:
          theme.palette.mode === "light"
            ? "rgba(255, 255, 255, 0.95)"
            : "rgba(15, 23, 42, 0.9)",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", gap: 2 }}>
        {/* IZQUIERDA */}
        <Stack direction="row" alignItems="center" spacing={1}>
          <MenuBookIcon color="primary" />
          <Typography
            component={RouterLink}
            to={user ? "/books" : "/login"}
            variant="h6"
            sx={{
              textDecoration: "none",
              fontWeight: 700,
              color: "text.primary",
            }}
          >
            Biblioteca Escolar
          </Typography>
        </Stack>

        {/* CENTRO - NAVEGACIÓN */}
        {user && (
          <Stack direction="row" spacing={1} sx={{ display: { xs: "none", sm: "flex" } }}>
            {/* SOLO BIBLIOTECARIO */}
            {isLibrarian && (
              <Button
                component={RouterLink}
                to="/dashboard"
                variant={isActive("/dashboard") ? "contained" : "text"}
                color={isActive("/dashboard") ? "primary" : "inherit"}
                size="small"
              >
                Panel
              </Button>
            )}

            {/* TODOS */}
            <Button
              component={RouterLink}
              to="/books"
              variant={isActive("/books") ? "contained" : "text"}
              color={isActive("/books") ? "primary" : "inherit"}
              size="small"
            >
              Libros
            </Button>

            {/* SOLO BIBLIOTECARIO */}
            {isLibrarian && (
              <Button
                component={RouterLink}
                to="/loans"
                variant={isActive("/loans") ? "contained" : "text"}
                color={isActive("/loans") ? "primary" : "inherit"}
                size="small"
              >
                Préstamos
              </Button>
            )}
          </Stack>
        )}

        {/* DERECHA */}
        <Stack direction="row" spacing={1} alignItems="center">
          <Tooltip title={isDark ? "Modo claro" : "Modo oscuro"}>
            <IconButton onClick={toggleColorMode} size="small">
              {isDark ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Tooltip>

          {user && (
            <>
              <Typography
                variant="body2"
                sx={{ display: { xs: "none", md: "block" } }}
              >
                {user.name} · {isLibrarian ? "Bibliotecario" : "Alumno"}
              </Typography>

              <Button
                size="small"
                variant="outlined"
                color="inherit"
                onClick={handleLogout}
              >
                Cerrar sesión
              </Button>
            </>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
