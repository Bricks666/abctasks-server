export interface UserModel {
	readonly userId: number;
	readonly login: string;
	readonly password: string;
	readonly photo?: string | undefined;
}

export type SecureUserModel = Omit<UserModel, "password">;
export type VerifyUserModel = Pick<UserModel, "userId">;
