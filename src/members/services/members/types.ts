export interface GetUsersParams {
	readonly roomId: number;
}

export interface GetInvitedParams {
	readonly roomId: number;
}

export interface InviteUserParams {
	readonly roomId: number;
	readonly userId: number;
}

export interface AnswerInvitationParams {
	readonly userId: number;
	readonly token: string;
}

export interface RemoveUserParams {
	readonly roomId: number;
	readonly userId: number;
}

export interface IsExistsParams {
	readonly roomId: number;
	readonly userId: number;
}
