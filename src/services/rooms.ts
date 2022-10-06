import { SelectQuery } from 'mariadb-table-wrapper';
import {
	ACTIVITIES_TABLE,
	RoomsTable,
	roomsToUsersTable,
	ROOMS_TABLE,
	ROOMS_TO_USERS_TABLE,
	TASKS_TABLE,
} from '@/database';
import { RoomModel, TaskStatus } from '@/models';
import { GetRoomResponse } from './rooms.types';

const roomQuery: SelectQuery<RoomModel> = {
	joinedTable: {
		enable: true,
		joinTable: [
			{ table: TASKS_TABLE, invert: true, type: 'LEFT' },
			{ table: ACTIVITIES_TABLE, invert: true, type: 'LEFT' },
			{ table: ROOMS_TO_USERS_TABLE, invert: true, type: 'LEFT' },
		],
	},
	includes: {
		[ROOMS_TABLE]: ['*'],
		[TASKS_TABLE]: [
			{
				type: 'count',
				distinct: true,
				body: 'todoId',
				name: 'taskCount',
			},
			{
				type: 'count',
				distinct: true,
				body: {
					type: 'if',
					field: 'status',
					condition: {
						operator: '=',
						value: TaskStatus.DONE,
					},
					yes: 'todoId',
				},
				name: 'doneTaskCount',
			},
		],
		[ACTIVITIES_TABLE]: [
			{
				type: 'count',
				distinct: true,
				body: 'activityId',
				name: 'activitiesCount',
			},
		],
		[ROOMS_TO_USERS_TABLE]: [
			{
				type: 'count',
				distinct: true,
				body: 'userId',
				name: 'usersCount',
			},
		],
	},
	groupBy: ['roomId'],
};

export class RoomsServices {
	public static getRooms = async (userId: number) => {
		return RoomsTable.select<GetRoomResponse>({
			filters: {
				[ROOMS_TO_USERS_TABLE]: {
					userId: {
						operator: '=',
						value: userId,
					},
				},
			},
			...roomQuery,
		});
	};

	public static addRoom = async (userId: number, roomName: string, roomDescription: string) => {
		await RoomsTable.insert({
			roomName,
			roomDescription,
		});

		const room = await RoomsTable.selectOne({
			filters: {
				roomName: {
					operator: '=',
					value: roomName,
				},
				roomDescription: {
					operator: '=',
					value: roomDescription,
				},
			},
			orderBy: {
				roomId: 'DESC',
			},
			includes: ['roomId'],
		});
		await roomsToUsersTable.insert({
			roomId: room!.roomId,
			userId,
		});

		return RoomsTable.selectOne<GetRoomResponse>({
			filters: {
				roomId: {
					operator: '=',
					value: room!.roomId,
				},
			},
			...roomQuery,
		});
	};

	public static editRoom = async (roomId: number, roomName: string) => {
		await RoomsTable.update(
			{ roomName },
			{
				filters: {
					roomId: {
						operator: '=',
						value: roomId,
					},
				},
			}
		);
		return RoomsTable.selectOne<GetRoomResponse>({
			filters: {
				roomId: {
					operator: '=',
					value: roomId,
				},
			},
			...roomQuery,
		});
	};

	public static deleteRoom = async (roomId: number) => {
		await RoomsTable.delete({
			filters: {
				roomId: {
					operator: '=',
					value: roomId,
				},
			},
		});
	};
}
