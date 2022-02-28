import { Router } from "express";
import { ProgressControllers } from "../controllers";
import { accessVerify } from "../middlewares";

const progressRoutes = Router();

progressRoutes.get("/", accessVerify, ProgressControllers.getTasksProgress);
progressRoutes.get(
	"/subscribe",
	accessVerify,
	ProgressControllers.subscribeChangeProgress
);

export { progressRoutes };
