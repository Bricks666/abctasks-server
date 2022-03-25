import { Router } from "express";
import { ProgressControllers } from "../controllers";
import { accessVerify } from "../middlewares";

const progressRoutes = Router();

progressRoutes.get(
	"/:roomId",
	accessVerify,
	ProgressControllers.getTasksProgress
);
progressRoutes.get(
	"/:roomId/subscribe",
	accessVerify,
	ProgressControllers.subscribeChangeProgress
);

export { progressRoutes };
