import { Prisma } from '@prisma/client';

import { TestingRoomDto } from '../dto';
import { DEFAULT_ROOM } from '../configs';

export const convertTestingRoomDtoToRoomData = (
	data: TestingRoomDto
): Prisma.RoomUncheckedCreateInput => {
	const { description, id, name, ownerId, members = [], } = data;

	return {
		id,
		description: description ?? DEFAULT_ROOM.description,
		name: name ?? DEFAULT_ROOM.name,
		ownerId,
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
