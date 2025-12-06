import express from "express";
import cors from "cors";

import indexRoutes from "./routes/index.routes.js";
import taskRoutes from "./routes/tasks.routes.js";
import authRoutes from "./routes/auth.routes.js";  // 🔹 nuevo
import loansRoutes from "./routes/loans.routes.js";

const app = express();

const PORT = process.env.PORT || 8080;


app.use(cors());
app.use(express.json());

app.use("/api", loansRoutes);
app.use("/api", indexRoutes);
app.use("/api", taskRoutes);
app.use("/api", authRoutes);


app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});