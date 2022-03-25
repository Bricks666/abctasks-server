import { Router } from "express";
import { TasksController } from "../controllers";
import { accessVerify } from "../middlewares";

const taskRoutes = Router();

taskRoutes.get("/:roomId", accessVerify, TasksController.getTasks);
taskRoutes.put("/:roomId/new", accessVerify, TasksController.createTask);
taskRoutes.delete(
	"/:roomId/:id/delete",
	accessVerify,
	TasksController.deleteTask
);
taskRoutes.post("/:roomId/:id/edit", accessVerify, TasksController.editTask);

export { taskRoutes };
