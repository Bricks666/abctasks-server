import { param, body, header } from "express-validator";
import { Router } from "express";
import { GroupsControllers } from "@/controllers";
import { accessVerify, validationCheck } from "@/middlewares";

const groupsRouter = Router();

groupsRouter.get(
	"/:roomId",
	header("authorization").isString(),
	accessVerify(),
	param("roomId").isInt({ min: 0 }),
	validationCheck(),
	GroupsControllers.getTaskGroups
);
groupsRouter.put(
	"/:roomId/new",
	header("authorization").isString(),
	accessVerify(),
	param("roomId").isInt({ min: 0 }),
	body("mainColor").isHexColor(),
	body("secondColor").isHexColor(),
	body("name").isString().notEmpty(),
	validationCheck(),
	GroupsControllers.createTaskGroup
);
groupsRouter.delete(
	"/:roomId/:id/delete",
	header("authorization").isString(),
	accessVerify(),
	param("roomId").isInt({ min: 0 }),
	param("id").isInt({ min: 0 }),
	validationCheck(),
	GroupsControllers.deleteGroup
);
groupsRouter.post(
	"/:roomId/:id/edit",
	header("authorization").isString(),
	accessVerify(),
	param("roomId").isInt({ min: 0 }),
	param("id").isInt({ min: 0 }),
	body("mainColor").isHexColor(),
	body("secondColor").isHexColor(),
	body("name").isString().notEmpty(),
	validationCheck(),
	GroupsControllers.editGroup
);

export { groupsRouter };
