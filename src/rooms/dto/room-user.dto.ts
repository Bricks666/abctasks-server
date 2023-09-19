import { RoomUser as RoomUserModel } from '@prisma/client';

export class RoomUserDto implements RoomUserModel {
	declare roomId: number;

	declare userId: number;

	declare activated: boolean;

	declare removed: boolean;
}
