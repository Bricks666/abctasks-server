import {
	ACTIVITIES_TABLE,
	RoomsTable,
	ROOMS_TABLE,
	TASKS_TABLE,
	USERS_TABLE,
} from "../database";

export class RoomsServices {
	/*
  {
    roomId: number;
    roomName: string;
    roomDescription: string;
    ownerId: number;
    taskCount: number;
    doneTaskCount: number
    activitiesCount: number;
    usersCount: number
  }
  */
	public static getRooms = async (userId: number) => {
		return await RoomsTable.select({
			filters: {
				ownerId: {
					operator: "=",
					value: userId,
				},
			},
			joinedTable: {
				enable: true,
				joinTable: [TASKS_TABLE, USERS_TABLE, ACTIVITIES_TABLE],
			},
			includes: {
				[ROOMS_TABLE]: ["*"],
			},
			count: []
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
	public static editRoom = async (roomId: number, roomName: string) => {
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
