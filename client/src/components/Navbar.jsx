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
            ? "rgba(255, 255, 255, 0.9)"
            : "rgba(15, 23, 42, 0.9)",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", gap: 2 }}>
        {/* Izquierda: logo + título */}
        <Stack direction="row" alignItems="center" spacing={1}>
          <MenuBookIcon color="primary" />
          <Typography
            component={RouterLink}
            to={user ? "/dashboard" : "/login"}
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

        {/* Centro: navegación */}
        {user && (
          <Stack
            direction="row"
            spacing={1}
            sx={{ display: { xs: "none", sm: "flex" } }}
          >
            <Button
              component={RouterLink}
              to="/dashboard"
              variant={isActive("/dashboard") ? "contained" : "text"}
              color={isActive("/dashboard") ? "primary" : "inherit"}
              size="small"
            >
              Dashboard
            </Button>

            <Button
              component={RouterLink}
              to="/books"
              variant={isActive("/books") ? "contained" : "text"}
              color={isActive("/books") ? "primary" : "inherit"}
              size="small"
            >
              Libros
            </Button>

            <Button
              component={RouterLink}
              to="/loans"
              variant={isActive("/loans") ? "contained" : "text"}
              color={isActive("/loans") ? "primary" : "inherit"}
              size="small"
            >
              Préstamos
            </Button>
          </Stack>
        )}

        {/* Derecha: usuario + dark mode */}
        <Stack direction="row" spacing={1} alignItems="center">
          <Tooltip title={isDark ? "Cambiar a claro" : "Cambiar a oscuro"}>
            <IconButton onClick={toggleColorMode} size="small">
              {isDark ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Tooltip>

          {user ? (
            <>
              <Typography
                variant="body2"
                sx={{ display: { xs: "none", md: "block" } }}
              >
                {user.name} · {user.role === "librarian" ? "Bibliotecario" : "Alumno"}
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
          ) : (
            <Button
              size="small"
              variant="contained"
              color="primary"
              component={RouterLink}
              to="/login"
            >
              Ingresar
            </Button>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
