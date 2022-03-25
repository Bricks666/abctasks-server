import { CookieOptions, RequestHandler } from "express";
import { COOKIE_NAME, COOKIE_TIME } from "../config";
import { ApiError, TokensService, AuthServices } from "../services";

/* interface RegistrationRequest {
	readonly password: string;
	readonly login: string;
	readonly photo?: string;
}
interface LoginRequestBody {
	readonly login: string;
	readonly password: string;
	readonly remember: boolean;
} */

export class AuthController {
	public static registration: RequestHandler = async (req, res, next) => {
		try {
			const { login, password, photo } = req.body;
			if (!login || !password) {
				throw ApiError.BadRequest("Loading and password must be provided");
			}

			await AuthServices.registrationUser(login, password, photo);

			res.json({ resultCode: 0 });
		} catch (e) {
			next(e);
		}
	};

	public static authentication: RequestHandler = async (req, res, next) => {
		try {
			const refreshToken = req.cookies[COOKIE_NAME];

			if (!refreshToken) {
				throw ApiError.UnAuthorization();
			}

			const user = TokensService.checkToken(refreshToken);

			if (!user) {
				throw ApiError.BadRequest("Токен обновления не действительный");
			}

			const tokens = TokensService.createTokens({ userId: user.userId });

			res.cookie(COOKIE_NAME, tokens.refreshToken, {
				httpOnly: true,
				sameSite: "none",
				secure: true,
				maxAge: COOKIE_TIME,
			});

			res.json(tokens);
		} catch (e) {
			next(e);
		}
	};
	public static login: RequestHandler = async (req, res, next) => {
		try {
			const { login, password, remember } = req.body;

			if (!login || !password) {
				throw ApiError.BadRequest("Login and password must be provided");
			}
			const user = await AuthServices.loginUser(login, password);

			const cookieOptions: CookieOptions = {
				httpOnly: true,
				sameSite: "none",
				secure: true,
			};

			if (remember) {
				cookieOptions.maxAge = COOKIE_TIME;
			}

			const tokens = TokensService.createTokens({ userId: user.userId });

			res.cookie(COOKIE_NAME, tokens.refreshToken, cookieOptions);

			res.json(tokens);
		} catch (e) {
			next(e);
		}
	};
	public static logout: RequestHandler = (_req, res) => {
		res.clearCookie(COOKIE_NAME);
		res.json({ resultCode: 0 });
	};

	public static refresh: RequestHandler = (req, res, next) => {
		try {
			const refreshToken = req.cookies[COOKIE_NAME];
			if (!refreshToken) {
				throw ApiError.UnAuthorization();
			}
			const tokens = TokensService.refreshTokens(refreshToken);

			if (!tokens) {
				throw ApiError.UnAuthorization();
			}

			res.cookie(COOKIE_NAME, tokens.refreshToken, {
				httpOnly: true,
				sameSite: "none",
				secure: true,
				maxAge: COOKIE_TIME,
			});

			if (!tokens) {
				throw ApiError.UnAuthorization();
			}
			res.json(tokens);
		} catch (e) {
			next(e);
		}
	};
}
