import { Prisma } from '@prisma/client';
import { TestingMemberDto } from '../dto';
import { DEFAULT_MEMBER } from '../configs';

export const convertTestingMemberDtoToMemberData = (
	data: TestingMemberDto
): Prisma.MemberUncheckedCreateInput => {
	const { roomId, status, userId, } = data;

	return {
		roomId,
		userId,
		status: status ?? DEFAULT_MEMBER.status,
	};
};
