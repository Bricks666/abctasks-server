import { Router } from "express";

import { taskRoutes } from "./task.routes";
import { authRoutes } from "./auth.routes";
import { activityRoutes } from "./activity.routes";
import { groupsRouter } from "./groups.routes";
import { progressRoutes } from "./progress.routes";
import { profileRoutes } from "./profile.routes";

const appRoutes = Router();

appRoutes.use("/auth", authRoutes);
appRoutes.use("/todos", taskRoutes);
appRoutes.use("/activities", activityRoutes);
appRoutes.use("/groups", groupsRouter);
appRoutes.use("/progress", progressRoutes);
appRoutes.use("/profile", profileRoutes);

export { appRoutes };
