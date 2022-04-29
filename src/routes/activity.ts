import { Router } from "express";
import { cookie, param } from "express-validator";
import { accessVerify, validationCheck } from "@/middlewares";
import { ActivitiesController } from "@/controllers";
import { COOKIE_NAME } from "@/config";

const activityRoutes = Router();

activityRoutes.get(
	"/:roomId",
	cookie(COOKIE_NAME, "You are not authorization").isString(),
	accessVerify(),
	param("roomId", "Room id must be provided").isInt({
		min: 0,
	}),
	validationCheck(),
	ActivitiesController.getActivities
);
activityRoutes.get(
	"/:roomId/subscribe",
	cookie(COOKIE_NAME, "You are not authorization").isString(),
	accessVerify(),
	param("roomId", "Room id must be provided")
		.isInt({
			min: 0,
		})
		.toInt(),
	validationCheck(),
	ActivitiesController.subscribeNewActivities
);

export { activityRoutes };
