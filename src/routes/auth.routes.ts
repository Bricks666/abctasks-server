import { Router } from "express";
import { UsersController } from "../controllers";
import { accessVerify } from "../middlewares";

const authRoutes = Router();

authRoutes.get("/", UsersController.authentication);
authRoutes.put("/registration", UsersController.registration);
authRoutes.post("/login", UsersController.login);
authRoutes.delete("/logout", UsersController.logout);
authRoutes.get("/refresh", UsersController.refresh);
authRoutes.post("/update", accessVerify, UsersController.updateUser);

export { authRoutes };
