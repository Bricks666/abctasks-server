export interface GetUsersParams {
	readonly roomId: number;
}

export interface GetInvitationsParams {
	readonly roomId: number;
}

export interface InviteUserParams {
	readonly roomId: number;
	readonly userId: number;
}

export interface AddUserParams {
	readonly userId: number;
	readonly hash: string;
}

export interface ApproveInviteParams {
	readonly roomId: number;
	readonly userId: number;
}

export interface RejectInviteParams {
	readonly roomId: number;
	readonly userId: number;
}

export interface GenerateInviteHashParams {
	readonly roomId: number;
}

export interface RemoveUserParams {
	readonly roomId: number;
	readonly userId: number;
}

export interface IsExistsParams {
	readonly roomId: number;
	readonly userId: number;
}
