export interface GetUsersParams {
	readonly roomId: number;
}

export interface AddUserParams {
	readonly userId: number;
	readonly roomId: number;
}

export interface RemoveUserParams {
	readonly userId: number;
	readonly roomId: number;
}

export interface ExistsUserParams {
	readonly roomId: number;
	readonly userId: number;
}
