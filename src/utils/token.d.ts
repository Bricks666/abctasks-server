import { Secret, SignOptions, VerifyOptions } from "jsonwebtoken";
export declare const signToken: <T extends string | object>(token: T, secret: Secret, options?: SignOptions | undefined) => string;
export declare const verifyToken: <T>(token: string, secret: Secret, options?: VerifyOptions | undefined) => T;
