import { sign, Secret, SignOptions, verify, VerifyOptions } from "jsonwebtoken";

export const signToken = <T extends object | string>(
	token: T,
	secret: Secret,
	options?: SignOptions
): string => {
	return sign(token, secret, options);
};

export const verifyToken = <T>(
	token: string,
	secret: Secret,
	options?: VerifyOptions
): T => {
	return verify(token, secret, options) as T;
};
