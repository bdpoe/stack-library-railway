import { Router } from "express";
import upload from "../middlewares/upload.js";
import {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  toggleTask,
} from "../controllers/tasks.controllers.js";

const router = Router();

router.get("/tasks", getTasks);
router.get("/tasks/:id", getTask);

router.post("/tasks", upload.single("image"), createTask);
router.put("/tasks/:id", upload.single("image"), updateTask);

router.delete("/tasks/:id", deleteTask);
router.put("/tasks/:id/toggle", toggleTask);

export default router;
