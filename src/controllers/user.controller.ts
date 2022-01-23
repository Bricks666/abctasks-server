import { RequestHandler } from "express";
import { COOKIE_NAME } from "../config";
import { ResponseWithTokens, ResponseWithUser } from "../interfaces/responses";
import {
	ApiError,
	checkToken,
	createTokens,
	getUser,
	loginUser,
	refreshTokens,
	registrationUser,
} from "../services";

interface RegistrationRequestBody {
	readonly password: string;
	readonly login: string;
	readonly photo?: string;
}

export const registration: RequestHandler<
	undefined,
	unknown,
	RegistrationRequestBody
> = async (req, res, next) => {
	try {
		const { login, password, photo } = req.body;
		if (!login || !password) {
			throw ApiError.BadRequest("Loading and password must be provided");
		}

		await registrationUser(login, password, photo);

		res.json({ resultCode: 0 });
	} catch (e) {
		next(e);
	}
};

export const authentication: RequestHandler<
	undefined,
	ResponseWithTokens & ResponseWithUser
> = async (req, res, next) => {
	try {
		const refreshToken = req.cookies[COOKIE_NAME];

		if (!refreshToken) {
			throw ApiError.UnAuthorization();
		}

		const user = checkToken(refreshToken);

		if (!user) {
			throw ApiError.BadRequest("Токен обновления не действительный");
		}

		const userData = await getUser(user.userId);

		const tokens = createTokens(userData);

		res.json({
			...tokens,
			user: userData,
		});
	} catch (e) {
		next(e);
	}
};
interface LoginRequestBody {
	readonly login: string;
	readonly password: string;
}

export const login: RequestHandler<
	undefined,
	ResponseWithTokens & ResponseWithUser,
	LoginRequestBody
> = async (req, res, next) => {
	try {
		const { login, password } = req.body;
		if (!login || !password) {
			throw ApiError.BadRequest("Login and password must be provided");
		}
		const response = await loginUser(login, password);

		res.cookie(COOKIE_NAME, response.refreshToken, {
			httpOnly: true,
			sameSite: "none",
			secure: true,
		});

		res.json(response);
	} catch (e) {
		next(e);
	}
};

export const logout: RequestHandler = (_req, res) => {
	res.clearCookie(COOKIE_NAME);
	res.json({ resultCode: 0 });
};

export const refresh: RequestHandler = (req, res, next) => {
	try {
		const refreshToken = req.headers.authorization?.split(" ")[1];
		if (!refreshToken) {
			throw ApiError.UnAuthorization();
		}
		const response = refreshTokens(refreshToken);
		res.json(response);
	} catch (e) {
		next(e);
	}
};
