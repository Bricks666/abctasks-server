import { MemberStatus } from '@prisma/client';

export interface GetMembersParams {
	readonly roomId: number;
}

export interface AddMemberParams {
	readonly userId: number;
	readonly roomId: number;
}

export interface UpdateMemberParams {
	readonly userId: number;
	readonly roomId: number;
	readonly status: MemberStatus;
}

export interface RemoveMemberParams {
	readonly userId: number;
	readonly roomId: number;
}

export interface ExistsMemberParams {
	readonly roomId: number;
	readonly userId: number;
}
