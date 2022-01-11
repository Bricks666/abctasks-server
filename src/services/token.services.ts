import { readFileSync } from "fs";
import { resolve } from "path";
import { VerifyUserModel } from "../models";
import { signToken, verifyToken } from "../utils";

const PUBLIC_KEY = readFileSync(
	resolve(__dirname, "../config/public_key.pem"),
	"utf-8"
);
const PRIVATE_KEY = readFileSync(
	resolve(__dirname, "../config/private_key.pem"),
	"utf-8"
);

export const checkToken = (token: string) => {
	try {
		const user = verifyToken<VerifyUserModel>(token, PUBLIC_KEY);
		if (!user) {
			throw new Error();
		}

		return user;
	} catch (e) {
		return null;
	}
};

export const createTokens = (user: VerifyUserModel) => {
	const accessToken = signToken(user, PRIVATE_KEY, {
		algorithm: "RS256",
		expiresIn: "10s",
	});
	const refreshToken = signToken(user, PRIVATE_KEY, {
		algorithm: "RS256",
		expiresIn: "14d",
	});

	return {
		accessToken,
		refreshToken,
	};
};

export const refreshTokens = (refreshToken: string) => {
	try {
		const user = verifyToken<VerifyUserModel>(refreshToken, PUBLIC_KEY);

		return createTokens(user);
	} catch (e) {
		return null;
	}
};
