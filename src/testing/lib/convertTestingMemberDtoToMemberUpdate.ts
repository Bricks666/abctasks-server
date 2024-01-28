import { Prisma } from '@prisma/client';
import { TestingMemberDto } from '../dto';
import { DEFAULT_MEMBER } from '../configs';

export const convertTestingMemberDtoToMemberUpdate = (
	data: TestingMemberDto
): Prisma.MemberUpdateInput => {
	const { status, } = data;

	return {
		status: status ?? DEFAULT_MEMBER.status,
	};
};
