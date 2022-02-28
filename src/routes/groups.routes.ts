import { Router } from "express";
import { GroupsControllers } from "../controllers";
import { accessVerify } from "../middlewares";

const groupsRouter = Router();

groupsRouter.get("/", accessVerify, GroupsControllers.getTaskGroups);
groupsRouter.put("/new", accessVerify, GroupsControllers.createTaskGroup);
groupsRouter.post("/:id/edit", accessVerify);
groupsRouter.delete("/:id/delete", accessVerify);

export { groupsRouter };
