import { Prisma } from '@prisma/client';
import { TestingMemberDto } from '../dto';

export const convertTestingMemberDtoToMemberUniqueFilter = (
	data: TestingMemberDto
): Prisma.MemberWhereUniqueInput | null => {
	const { room, user, } = data;

	return room.id && user.id
		? {
			roomId_userId: {
				roomId: room.id,
				userId: user.id,
			},
		  }
		: null;
};
