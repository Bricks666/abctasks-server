import { Prisma } from '@prisma/client';

import { TestingRoomDto } from '../dto';
import { DEFAULT_ROOM } from '../configs';

export const convertTestingRoomDtoToRoomData = (
	data: TestingRoomDto
): Prisma.RoomUncheckedCreateInput => {
	return {
		id: data.id,
		description: data.description ?? DEFAULT_ROOM.description,
		name: data.name ?? DEFAULT_ROOM.name,
		ownerId: data.ownerId,
	};
};
