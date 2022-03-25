import { Router } from "express";
import { RoomsController } from "../controllers";
import { accessVerify } from "../middlewares";

const roomsRoutes = Router();

roomsRoutes.get("/", accessVerify, RoomsController.getRooms);
roomsRoutes.put("/add", accessVerify, RoomsController.addRoom);
roomsRoutes.post("/:id/update", accessVerify, RoomsController.updateRoom);
roomsRoutes.delete("/:id/delete", accessVerify, RoomsController.deleteRoom);

export { roomsRoutes };
