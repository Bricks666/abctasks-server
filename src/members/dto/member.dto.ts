import { MemberStatus, Member as MemberModel } from '@prisma/client';

export class MemberDto implements MemberModel {
	declare roomId: number;

	declare userId: number;

	declare status: MemberStatus;
}
