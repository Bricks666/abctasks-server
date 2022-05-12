import { param, body, header } from "express-validator";
import { Router } from "express";
import { RoomsController } from "@/controllers";
import { accessVerify, validationCheck } from "@/middlewares";

const roomsRoutes = Router();

roomsRoutes.get(
	"/",
	header("authorization").isString(),
	accessVerify(),
	validationCheck(),
	RoomsController.getRooms
);
roomsRoutes.put(
	"/new",
	header("authorization").isString(),
	accessVerify(),
	body("roomName").isString().notEmpty(),
	validationCheck(),
	RoomsController.addRoom
);
roomsRoutes.post(
	"/:roomId/edit",
	header("authorization").isString(),
	accessVerify(),
	body("roomName").isString().notEmpty(),
	param("roomId").isInt({
		min: 0,
	}),
	validationCheck(),
	RoomsController.editRoom
);
roomsRoutes.delete(
	"/:roomId/delete",
	header("authorization").isString(),
	accessVerify(),
	param("roomId").isInt({
		min: 0,
	}),
	validationCheck(),
	RoomsController.deleteRoom
);

export { roomsRoutes };
