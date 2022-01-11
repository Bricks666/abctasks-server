import { Router } from "express";
import { getTodos } from "../services/todos.services";

const todoRoutes = Router();
todoRoutes.get("/", getTodos);

export { todoRoutes };
