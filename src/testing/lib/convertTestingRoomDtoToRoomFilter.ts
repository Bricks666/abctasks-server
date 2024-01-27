import { Prisma } from '@prisma/client';
import { TestingRoomDto } from '../dto';

export const convertTestingRoomDtoToRoomFilter = (
	params: TestingRoomDto
): Prisma.RoomWhereInput => {
	const { description, id, name, ownerId, members = [], } = params;

	const userIds = members.map((member) => member.userId);

	const statuses = members.map((member) => member.status);

	return {
		id,
		ownerId,
		description,
		name,
		members: {
			some: {
				AND: {
					userId: {
						in: userIds,
					},
					status: {
						in: statuses,
					},
				},
			},
		},
	};
};
