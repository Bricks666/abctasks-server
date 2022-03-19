import { Router } from "express";
import { AuthController } from "../controllers";

const authRoutes = Router();

authRoutes.get("/", AuthController.authentication);
authRoutes.put("/registration", AuthController.registration);
authRoutes.post("/login", AuthController.login);
authRoutes.delete("/logout", AuthController.logout);
authRoutes.get("/refresh", AuthController.refresh);

export { authRoutes };
