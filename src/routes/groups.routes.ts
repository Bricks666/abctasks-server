import { Router } from "express";
import { GroupsControllers } from "../controllers";
import { accessVerify } from "../middlewares";

const groupsRouter = Router();

groupsRouter.get("/:roomId", accessVerify, GroupsControllers.getTaskGroups);
groupsRouter.put(
	"/:roomId/new",
	accessVerify,
	GroupsControllers.createTaskGroup
);
groupsRouter.delete(
	"/:roomId/:id/delete",
	accessVerify,
	GroupsControllers.deleteGroup
);
groupsRouter.post(
	"/:roomId/:id/edit",
	accessVerify,
	GroupsControllers.editGroup
);

export { groupsRouter };
