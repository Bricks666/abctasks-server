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
export class TokensService {
	public static checkToken = (token: string) => {
		try {
			const user = verifyToken<VerifyUserModel>(token, PUBLIC_KEY);
			if (!user) {
				return null;
			}

			return user;
		} catch (e) {
			return null;
		}
	};

	public static createTokens = (user: VerifyUserModel) => {
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

	public static refreshTokens = (refreshToken: string) => {
		try {
			const user = verifyToken<VerifyUserModel>(refreshToken, PUBLIC_KEY);

			return TokensService.createTokens({
				userId: user.userId,
			});
		} catch (e) {
			return null;
		}
	};
}
