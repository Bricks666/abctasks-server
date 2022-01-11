import { Router } from "express";
import {
	registration,
	authentication,
	login,
	logout,
	refresh,
} from "../controllers";

const authRoutes = Router();

authRoutes.get("/", authentication);
authRoutes.put("/registration", registration);
authRoutes.post("/login", login);
authRoutes.delete("/logout", logout);
authRoutes.delete("/refresh", refresh);

export { authRoutes };
