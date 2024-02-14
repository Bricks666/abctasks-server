import { Prisma } from '@prisma/client';
import { TestingMemberDto } from '../dto';

export const convertTestingMemberDtoToMemberFilter = (
	data: TestingMemberDto
): Prisma.MemberWhereInput => {
	const { room, status, user, } = data;

	return {
		status,
		roomId: room.id,
		userId: user.id,
	};
};
