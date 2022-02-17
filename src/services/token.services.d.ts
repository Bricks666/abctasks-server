import { VerifyUserModel } from "../models";
export declare class TokensService {
    static checkToken: (token: string) => VerifyUserModel | null;
    static createTokens: (user: VerifyUserModel) => {
        accessToken: string;
        refreshToken: string;
    };
    static refreshTokens: (refreshToken: string) => {
        accessToken: string;
        refreshToken: string;
    } | null;
}
