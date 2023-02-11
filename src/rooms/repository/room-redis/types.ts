export interface GetInviteHashParams {
	readonly roomId: number;
}

export interface SetInviteHashParams {
	readonly roomId: number;
	readonly hash: string;
}

export interface RemoveInviteHashParams {
	readonly roomId: number;
}

export interface ExistsUserInvitedParams {
	readonly roomId: number;
	readonly userId: number;
}

export interface AddUserInvitedParams {
	readonly roomId: number;
	readonly userId: number;
}

export interface RemoveUserInvitedParams {
	readonly roomId: number;
	readonly userId: number;
}
