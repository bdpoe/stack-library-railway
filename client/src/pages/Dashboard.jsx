// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import { getLoansRequest } from "../api/loans.api"; // Para obtener préstamos

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalLoans: 0,
    activeLoans: 0,
    returnedLoans: 0,
  });

  const loadStats = async () => {
    try {
      const res = await getLoansRequest();
      const loans = res.data;

      const active = loans.filter((loan) => loan.status === "activo").length;
      const returned = loans.filter((loan) => loan.status === "devuelto").length;

      setStats({
        totalLoans: loans.length,
        activeLoans: active,
        returnedLoans: returned,
      });
    } catch (err) {
      console.error("Error loading stats", err);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={4}>
        <Card>
          <CardContent>
            <Typography variant="h5" color="textSecondary" gutterBottom>
              Total Préstamos
            </Typography>
            <Typography variant="h6">{stats.totalLoans}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Card>
          <CardContent>
            <Typography variant="h5" color="textSecondary" gutterBottom>
              Préstamos Activos
            </Typography>
            <Typography variant="h6">{stats.activeLoans}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Card>
          <CardContent>
            <Typography variant="h5" color="textSecondary" gutterBottom>
              Préstamos Devueltos
            </Typography>
            <Typography variant="h6">{stats.returnedLoans}</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
