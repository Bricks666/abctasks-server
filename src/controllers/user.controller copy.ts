import { CookieOptions, RequestHandler } from "express";
import { COOKIE_NAME, COOKIE_TIME } from "../config";
import { ResponseWithTokens, ResponseWithUser } from "../interfaces/responses";
import { ApiError, TokensService, UserService } from "../services";

interface RegistrationRequestBody {
	readonly password: string;
	readonly login: string;
	readonly photo?: string;
}
interface LoginRequestBody {
	readonly login: string;
	readonly password: string;
	readonly remember: boolean;
}

export class UsersController {
	public static registration: RequestHandler<
		undefined,
		unknown,
		RegistrationRequestBody
	> = async (req, res, next) => {
		try {
			const { login, password, photo } = req.body;
			if (!login || !password) {
				throw ApiError.BadRequest("Loading and password must be provided");
			}

			await UserService.registrationUser(login, password, photo);

			res.json({ resultCode: 0 });
		} catch (e) {
			next(e);
		}
	};

	public static authentication: RequestHandler<
		undefined,
		ResponseWithTokens & ResponseWithUser
	> = async (req, res, next) => {
		try {
			const refreshToken = req.cookies[COOKIE_NAME];

			if (!refreshToken) {
				throw ApiError.UnAuthorization();
			}

			const user = TokensService.checkToken(refreshToken);

			if (!user) {
				throw ApiError.BadRequest("Токен обновления не действительный");
			}

			const userData = await UserService.getUser(user.userId);

			const tokens = TokensService.createTokens({ userId: user.userId });

			res.cookie(COOKIE_NAME, tokens.refreshToken, {
				httpOnly: true,
				sameSite: "none",
				secure: true,
				maxAge: COOKIE_TIME,
			});

			res.json({
				...tokens,
				user: userData,
			});
		} catch (e) {
			next(e);
		}
	};
	public static login: RequestHandler<
		undefined,
		ResponseWithTokens & ResponseWithUser,
		LoginRequestBody
	> = async (req, res, next) => {
		try {
			const { login, password, remember } = req.body;

			if (!login || !password) {
				throw ApiError.BadRequest("Login and password must be provided");
			}
			const response = await UserService.loginUser(login, password);

			const cookieOptions: CookieOptions = {
				httpOnly: true,
				sameSite: "none",
				secure: true,
			};

			if (remember) {
				cookieOptions.maxAge = COOKIE_TIME;
			}

			res.cookie(COOKIE_NAME, response.refreshToken, cookieOptions);

			res.json(response);
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

	public static updateUser: RequestHandler = (req, _, next) => {
		try {
			console.log(req.body);
		} catch (e) {
			next(e);
		}
	};
}
