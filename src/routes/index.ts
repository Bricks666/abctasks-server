import { Router } from "express";

import { taskRoutes } from "./task.routes";
import { authRoutes } from "./auth.routes";
import { activityRoutes } from "./activity.routes";

const appRoutes = Router();

appRoutes.use("/auth", authRoutes);
appRoutes.use("/todos", taskRoutes);
appRoutes.use("/activities", activityRoutes);

export { appRoutes };
