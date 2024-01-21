import { Prisma } from '@prisma/client';
import { TestingRoomDto } from '../dto';

export const convertTestingRoomDtoToRoomFilter = (
	params: TestingRoomDto
): Prisma.RoomWhereInput => {
	const { description, id, name, ownerId, } = params;

	return {
		id,
		ownerId,
		description,
		name,
		members: {
			some: {
				status: 'activated',
				userId: ownerId,
			},
		},
	};
};
