import { Prisma } from '@prisma/client';
import { TestingMemberDto } from '../dto';

export const convertTestingMemberDtoToMemberUniqueFilter = (
	data: TestingMemberDto
): Prisma.MemberWhereUniqueInput | null => {
	const { roomId, userId, } = data;

	return roomId && userId
		? {
			roomId_userId: {
				roomId,
				userId,
			},
		  }
		: null;
};
