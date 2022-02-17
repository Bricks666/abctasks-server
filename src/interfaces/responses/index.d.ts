import { SecureUserModel } from "../../models";
export interface ResponseWithTokens {
    readonly refreshToken: string;
    readonly accessToken: string;
}
export interface ResponseWithUser {
    readonly user: SecureUserModel;
}
