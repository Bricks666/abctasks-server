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

export interface RemoveUserParams {
	readonly userId: number;
	readonly roomId: number;
}

export interface RemoveUserHardParams extends RemoveUserParams {
	readonly activated?: boolean;
}

export interface ExistsUserParams {
	readonly roomId: number;
	readonly userId: number;
}
