import { accessVerify } from "../middlewares";
import { Router } from "express";
import { ActivitiesController } from "../controllers";

const activityRoutes = Router();

activityRoutes.get("/", accessVerify, ActivitiesController.getActivities);
activityRoutes.get(
	"/subscribe",
	accessVerify,
	ActivitiesController.subscribeNewActivities
);

export { activityRoutes };
