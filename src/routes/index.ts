import { Router } from "express";

import { todoRoutes } from "./todo.routes";
import { authRoutes } from "./auth.routes";

const appRoutes = Router();

appRoutes.use("/auth", authRoutes);
appRoutes.use("/todos", todoRoutes);

export { appRoutes };
