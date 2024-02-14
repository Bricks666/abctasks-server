import { Prisma } from '@prisma/client';
import { TestingMemberDto } from '../dto';
import { DEFAULT_MEMBER } from '../configs';

export const convertTestingMemberDtoToMemberData = (
	data: TestingMemberDto
): Prisma.MemberUncheckedCreateInput => {
	const { room, status, user, } = data;

	return {
		roomId: room.id,
		userId: user.id,
		status: status ?? DEFAULT_MEMBER.status,
	};
};
