import { RequestHandler } from "express";
import { RoomsServices } from "@/services";

export class RoomsController {
	public static getRooms: RequestHandler = async (req, res, next) => {
		try {
			const { user } = req.body;
			const rooms = await RoomsServices.getRooms(user.userId);

			return res.json({ rooms });
		} catch (e) {
			next(e);
		}
	};
	public static addRoom: RequestHandler = async (req, res, next) => {
		try {
			const { user, roomName } = req.body;

			const room = await RoomsServices.addRoom(user.userId, roomName);

			return res.json({ room });
		} catch (e) {
			next(e);
		}
	};
	public static editRoom: RequestHandler = async (req, res, next) => {
		try {
			const { roomName } = req.body;
			const { id } = req.params;

			const room = await RoomsServices.editRoom(+id, roomName);

			return res.json({ room });
		} catch (e) {
			next(e);
		}
	};

	public static deleteRoom: RequestHandler = async (req, res, next) => {
		try {
			const { id } = req.params;

			await RoomsServices.deleteRoom(+id);

			return res.json({ resultCode: 0 });
		} catch (e) {
			next(e);
		}
	};
}
