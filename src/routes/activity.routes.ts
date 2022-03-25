import { accessVerify } from "../middlewares";
import { Router } from "express";
import { ActivitiesController } from "../controllers";

const activityRoutes = Router();

activityRoutes.get(
	"/:roomId",
	accessVerify,
	ActivitiesController.getActivities
);
activityRoutes.get(
	"/:roomId/subscribe",
	accessVerify,
	ActivitiesController.subscribeNewActivities
);

export { activityRoutes };
