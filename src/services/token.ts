import { VerifyUserModel } from '../models';
import { signToken, verifyToken } from '../utils';

export class TokensService {
	public static checkToken = (token: string) => {
		try {
			const user = verifyToken<VerifyUserModel>(token, process.env.SECRET);
			if (!user) {
				return null;
			}

			return user;
		} catch (e) {
			return null;
		}
	};

	public static createTokens = (user: VerifyUserModel) => {
		const accessToken = signToken(user, process.env.SECRET, {
			expiresIn: '10m',
		});
		const refreshToken = signToken(user, process.env.SECRET, {
			expiresIn: '14d',
		});

		return {
			accessToken,
			refreshToken,
		};
	};

	public static refreshTokens = (refreshToken: string) => {
		try {
			const user = verifyToken<VerifyUserModel>(
				refreshToken,
				process.env.SECRET
			);

			return TokensService.createTokens({
				userId: user.userId,
			});
		} catch (e) {
			return null;
		}
	};
}
