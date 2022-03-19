import { Router } from "express";
import { ProfileControllers } from "../controllers";
import { accessVerify, fileUpload } from "../middlewares";

const profileRoutes = Router();

profileRoutes.get("/", accessVerify, ProfileControllers.getProfile);
profileRoutes.post(
	"/update",
	accessVerify,
	fileUpload(),
	ProfileControllers.updateProfile
);

export { profileRoutes };
