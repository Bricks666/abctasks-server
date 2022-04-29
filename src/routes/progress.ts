import { COOKIE_NAME } from "@/config";
import { cookie, param } from "express-validator";
import { Router } from "express";
import { ProgressControllers } from "@/controllers";
import { accessVerify, validationCheck } from "@/middlewares";

const progressRoutes = Router();

progressRoutes.get(
	"/:roomId",
	cookie(COOKIE_NAME).isString(),
	accessVerify(),
	param("roomId").isInt({
		min: 0,
	}),
	validationCheck(),
	ProgressControllers.getTasksProgress
);
progressRoutes.get(
	"/:roomId/subscribe",
	cookie(COOKIE_NAME).isString(),
	accessVerify(),
	param("roomId").isInt({
		min: 0,
	}),
	validationCheck(),
	ProgressControllers.subscribeChangeProgress
);

export { progressRoutes };
