import { Prisma } from '@prisma/client';
import { TestingActivityDto } from '../dto';
import { convertTestingRoomDtoToRoomFilter } from './convertTestingRoomDtoToRoomFilter';
import { convertTestingUserDtoToUserFilter } from './convertTestingUserDtoToUserFilter';

export const convertTestingActivityDtoToActivityFilter = (
	dto: TestingActivityDto
): Prisma.ActivityWhereInput => {
	const { action, activist, createdAt, id, room, sphere, } = dto;

	return {
		id,
		action: {
			name: action,
		},
		sphere: {
			name: sphere,
		},
		createdAt,
		room_user: {
			room: convertTestingRoomDtoToRoomFilter(room),
			user: convertTestingUserDtoToUserFilter(activist),
		},
	};
};
