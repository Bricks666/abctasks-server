import { MemberStatus } from '@prisma/client';

export class TestingMemberDto {
	declare roomId?: number;

	declare userId?: number;

	declare status?: MemberStatus;
}
