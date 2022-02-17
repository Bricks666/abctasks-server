import { SecureUserModel } from "../models";
export declare class UserService {
    static registrationUser: (login: string, password: string, photo?: string | undefined) => Promise<void>;
    static loginUser: (login: string, password: string) => Promise<{
        accessToken: string;
        refreshToken: string;
        user: SecureUserModel;
    }>;
    static getUser: (userId: number) => Promise<SecureUserModel>;
}
