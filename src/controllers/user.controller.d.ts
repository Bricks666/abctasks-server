import { RequestHandler } from "express";
import { ResponseWithTokens, ResponseWithUser } from "../interfaces/responses";
interface RegistrationRequestBody {
    readonly password: string;
    readonly login: string;
    readonly photo?: string;
}
interface LoginRequestBody {
    readonly login: string;
    readonly password: string;
}
export declare class UsersController {
    static registration: RequestHandler<undefined, unknown, RegistrationRequestBody>;
    static authentication: RequestHandler<undefined, ResponseWithTokens & ResponseWithUser>;
    static login: RequestHandler<undefined, ResponseWithTokens & ResponseWithUser, LoginRequestBody>;
    static logout: RequestHandler;
    static refresh: RequestHandler;
}
export {};
