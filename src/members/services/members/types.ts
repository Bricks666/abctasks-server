export interface GetUsersParams {
	readonly roomId: number;
}

export interface AddMemberParams {
	readonly roomId: number;
	readonly userId: number;
}

export interface ExitMemberParams {
	readonly roomId: number;
	readonly userId: number;
}

export interface RemoveUserParams {
	readonly roomId: number;
	readonly userId: number;
}

export interface IsExistsParams {
	readonly roomId: number;
	readonly userId: number;
}
