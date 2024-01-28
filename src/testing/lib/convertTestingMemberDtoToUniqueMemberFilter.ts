import { Prisma } from '@prisma/client';
import { TestingMemberDto } from '../dto';

export const convertTestingMemberDtoToUniqueMemberFilter = (
	data: TestingMemberDto
): Prisma.MemberWhereUniqueInput => {
	const { roomId, userId, } = data;

	return {
		roomId_userId: {
			roomId,
			userId,
		},
	};
};
