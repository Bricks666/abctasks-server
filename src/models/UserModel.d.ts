export interface UserModel {
    readonly userId: number;
    readonly login: string;
    readonly password: string;
    readonly photo?: string | undefined;
}
export declare type SecureUserModel = Omit<UserModel, "password">;
export declare type VerifyUserModel = Pick<UserModel, "userId">;
