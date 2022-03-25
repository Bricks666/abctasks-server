import { RoomsTable } from "../database";

export class RoomsServices {
	public static getRooms = async (userId: number) => {
		return await RoomsTable.select({
			filters: {
				ownerId: {
					operator: "=",
					value: userId,
				},
			},
		});
	};

	public static addRoom = async (userId: number, roomName: string) => {
		await RoomsTable.insert({
			ownerId: userId,
			roomName: roomName,
		});

		return await RoomsTable.selectOne({
			filters: {
				ownerId: {
					operator: "=",
					value: userId,
				},
				roomName: {
					operator: "=",
					value: roomName,
				},
			},
			orderBy: {
				roomId: "DESC",
			},
		});
	};
	public static updateRoom = async (roomId: number, roomName: string) => {
		await RoomsTable.update(
			{ roomName },
			{
				roomId: {
					operator: "=",
					value: roomId,
				},
			}
		);
		return await RoomsTable.selectOne({
			filters: {
				roomId: {
					operator: "=",
					value: roomId,
				},
			},
		});
	};

	public static deleteRoom = async (roomId: number) => {
		await RoomsTable.delete({
			roomId: {
				operator: "=",
				value: roomId,
			},
		});
	};
}
