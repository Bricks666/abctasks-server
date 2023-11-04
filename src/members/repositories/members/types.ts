export interface GetUsersParams {
	readonly roomId: number;
}

export interface AddInvitationParams {
	readonly userId: number;
	readonly roomId: number;
}

export interface IsInvitedParams {
	readonly roomId: number;
	readonly userId: number;
}

export interface GetInvitationsParams {
	readonly roomId: number;
}

export interface ActivateUserParams {
	readonly roomId: number;
	readonly userId: number;
}

export interface AddUserParams {
	readonly userId: number;
	readonly roomId: number;
}

export interface RemoveMemberParams {
	readonly userId: number;
	readonly roomId: number;
}

export interface RemoveMemberHardParams extends RemoveMemberParams {
	readonly activated?: boolean;
}

export interface ExistsMemberParams {
	readonly roomId: number;
	readonly userId: number;
}
