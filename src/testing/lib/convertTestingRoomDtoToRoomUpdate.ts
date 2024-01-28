import { Prisma } from '@prisma/client';

import { TestingRoomDto } from '../dto';
import { DEFAULT_ROOM } from '../configs';

export const convertTestingRoomDtoToRoomUpdate = (
	data: TestingRoomDto
): Prisma.RoomUpdateInput => {
	const { description, name, ownerId, members = [], } = data;

	return {
		description: description ?? DEFAULT_ROOM.description,
		name: name ?? DEFAULT_ROOM.name,
		members: {
			createMany: {
				data: members
					.map((member) => {
						return {
							userId: member.userId,
							status: member.status,
						};
					})
					.concat({
						status: 'activated',
						userId: ownerId,
					}),
				skipDuplicates: true,
			},
		},
	};
};
