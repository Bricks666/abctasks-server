import { Prisma } from '@prisma/client';
import { TestingRoomDto } from '../dto';

export const convertTestingRoomDtoToUniqueRoomFilter = (
	params: TestingRoomDto
): Prisma.RoomWhereUniqueInput => {
	const { id, } = params;

	return {
		id,
	};
};
