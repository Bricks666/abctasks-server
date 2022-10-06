import { RoomModel } from '@/models';

export interface GetRoomResponse extends RoomModel {
	readonly taskCount: number;
	readonly doneTaskCount: number;
	readonly activitiesCount: number;
	readonly usersCount: number;
	readonly userId: number;
}
