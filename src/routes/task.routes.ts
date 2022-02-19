import { Router } from "express";
import { TasksController } from "../controllers";
import { accessVerify } from "../middlewares";

const taskRoutes = Router();

taskRoutes.get("/", accessVerify, TasksController.getTasks);
taskRoutes.get("/progress", accessVerify, TasksController.getTasksProgress);
taskRoutes.get("/groups", accessVerify, TasksController.getTaskGroups);
taskRoutes.put("/new", accessVerify, TasksController.createTask);
taskRoutes.delete("/:id/delete", accessVerify, TasksController.deleteTask);
taskRoutes.delete("/delete", accessVerify);
taskRoutes.post("/:id/edit", accessVerify, TasksController.editTask);

export { taskRoutes };
