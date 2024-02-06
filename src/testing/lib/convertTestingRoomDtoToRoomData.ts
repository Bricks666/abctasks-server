import { Prisma } from '@prisma/client';

import { TestingRoomDto } from '../dto';
import { DEFAULT_ROOM } from '../configs';

export const convertTestingRoomDtoToRoomData = (
	data: TestingRoomDto
): Prisma.RoomUncheckedCreateInput => {
	const { description, name, ownerId, members, } = data;

	const membersData: Prisma.Enumerable<Prisma.MemberCreateManyRoomInput> =
		members
			? members.map((member) => {
				return {
					userId: member.userId,
					status: member.status,
				};
			  })
			: [];

	return {
		description: description ?? DEFAULT_ROOM.description,
		name: name ?? DEFAULT_ROOM.name,
		ownerId,
		members: {
			createMany: {
				data: membersData.concat({
					status: 'activated',
					userId: ownerId,
				}),
				skipDuplicates: true,
			},
		},
	};
};
