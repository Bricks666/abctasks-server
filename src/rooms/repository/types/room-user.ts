export interface GetUsersFilters {
	readonly roomId: number;
}

export interface AddUserData {
	readonly userId: number;
	readonly roomId: number;
}

export interface RemoveUserData {
	readonly userId: number;
	readonly roomId: number;
}

export interface ExistsUserFilters {
	readonly roomId: number;
	readonly userId: number;
}
