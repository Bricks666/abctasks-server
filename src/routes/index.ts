import { Router } from "express";

import { taskRoutes } from "./task";
import { authRoutes } from "./auth";
import { activityRoutes } from "./activity";
import { groupsRouter } from "./groups";
import { progressRoutes } from "./progress";
import { profileRoutes } from "./profile";
import { roomsRoutes } from "./rooms";

const appRoutes = Router();

appRoutes.use("/auth", authRoutes);
appRoutes.use("/todos", taskRoutes);
appRoutes.use("/activities", activityRoutes);
appRoutes.use("/groups", groupsRouter);
appRoutes.use("/progress", progressRoutes);
appRoutes.use("/profile", profileRoutes);
appRoutes.use("/rooms", roomsRoutes);

export { appRoutes };
