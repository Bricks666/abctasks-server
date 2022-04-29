import { COOKIE_NAME } from "@/config";
import { cookie } from "express-validator";
import { Router } from "express";
import { ProfileControllers } from "@/controllers";
import { accessVerify, fileUpload, validationCheck } from "@/middlewares";

const profileRoutes = Router();

profileRoutes.get(
	"/",
	cookie(COOKIE_NAME).isString(),
	accessVerify(),
	validationCheck(),
	ProfileControllers.getProfile
);
profileRoutes.post(
	"/update",
	cookie(COOKIE_NAME).isString(),
	accessVerify(),
	validationCheck(),
	fileUpload(),
	ProfileControllers.updateProfile
);

export { profileRoutes };
