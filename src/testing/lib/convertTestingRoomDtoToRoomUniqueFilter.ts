import { Prisma } from '@prisma/client';
import { TestingRoomDto } from '../dto';

export const convertTestingRoomDtoToRoomUniqueFilter = (
	params: TestingRoomDto
): Prisma.RoomWhereUniqueInput | null => {
	const { id, } = params;

	return id
		? {
			id,
		  }
		: null;
};
