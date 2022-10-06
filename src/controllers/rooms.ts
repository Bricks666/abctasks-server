import { RequestHandler } from 'express';
import { RoomsServices } from '@/services';
import {
	RoomIdResponse,
	RoomRequest,
	RoomResponse,
	RoomsResponse,
} from './rooms.types';
import { RequestWithUser } from '@/interfaces/request';
import { RoomIdParam } from '@/interfaces/param';

export class RoomsController {
	public static getRooms: RequestHandler<
		undefined,
		RoomsResponse,
		RequestWithUser
	> = async (req, res, next) => {
			try {
				const { user } = req.body;
				const rooms = await RoomsServices.getRooms(user.userId);

				return res.json({ rooms });
			} catch (e) {
				next(e);
			}
		};
	public static addRoom: RequestHandler<undefined, RoomResponse, RoomRequest> =
		async (req, res, next) => {
			try {
				const { user, roomName, roomDescription } = req.body;

				const room = await RoomsServices.addRoom(
					user.userId,
					roomName,
					roomDescription
				);

				return res.json({ room: room! });
			} catch (e) {
				next(e);
			}
		};
	public static editRoom: RequestHandler<
		RoomIdParam,
		RoomResponse,
		RoomRequest
	> = async (req, res, next) => {
			try {
				const { roomName } = req.body;
				const { roomId } = req.params;

				const room = await RoomsServices.editRoom(+roomId, roomName);

				return res.json({ room: room! });
			} catch (e) {
				next(e);
			}
		};

	public static deleteRoom: RequestHandler<RoomIdParam, RoomIdResponse> =
		async (req, res, next) => {
			try {
				const { roomId } = req.params;

				await RoomsServices.deleteRoom(+roomId);

				return res.json({ roomId });
			} catch (e) {
				next(e);
			}
		};
}
