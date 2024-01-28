import { Prisma } from '@prisma/client';
import { TestingMemberDto } from '../dto';

export const convertTestingMemberDtoToMemberFilter = (
	data: TestingMemberDto
): Prisma.MemberWhereInput => {
	const { roomId, status, userId, } = data;

	return {
		roomId,
		status,
		userId,
	};
};
