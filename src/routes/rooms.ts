import { COOKIE_NAME } from "@/config";
import { cookie, param, body } from "express-validator";
import { Router } from "express";
import { RoomsController } from "@/controllers";
import { accessVerify, validationCheck } from "@/middlewares";

const roomsRoutes = Router();

roomsRoutes.get(
	"/",
	cookie(COOKIE_NAME).isString(),
	accessVerify(),
	validationCheck(),
	RoomsController.getRooms
);
roomsRoutes.put(
	"/new",
	cookie(COOKIE_NAME).isString(),
	accessVerify(),
	body("roomName").isString().notEmpty(),
	validationCheck(),
	RoomsController.addRoom
);
roomsRoutes.post(
	"/:id/edit",
	cookie(COOKIE_NAME).isString(),
	accessVerify(),
	body("roomName").isString().notEmpty(),
	param("id").isInt({
		min: 0,
	}),
	validationCheck(),
	RoomsController.editRoom
);
roomsRoutes.delete(
	"/:id/delete",
	cookie(COOKIE_NAME).isString(),
	accessVerify(),
	param("id").isInt({
		min: 0,
	}),
	validationCheck(),
	RoomsController.deleteRoom
);

export { roomsRoutes };
