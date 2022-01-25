import { Router } from "express";

import { taskRoutes } from "./task.routes";
import { authRoutes } from "./auth.routes";

const appRoutes = Router();

appRoutes.use("/auth", authRoutes);
appRoutes.use("/todos", taskRoutes);

export { appRoutes };
