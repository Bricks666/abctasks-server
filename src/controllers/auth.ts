import { CookieOptions, RequestHandler } from 'express';
import { COOKIE_NAME, COOKIE_TIME } from '@/config';
import { ApiError, TokensService, AuthServices } from '@/services';
import { StandardResponse } from '@/interfaces/response';
import {
	TokensResponse,
	RegistrationRequest,
	LoginRequest,
} from './auth.types';

export class AuthController {
	public static registration: RequestHandler<
		undefined,
		StandardResponse,
		RegistrationRequest
	> = async (req, res, next) => {
		try {
			const { login, password, photo } = req.body;
			await AuthServices.registrationUser(login, password, photo);
			res.json({ resultCode: 0 });
		} catch (e) {
			next(e);
		}
	};

	public static authentication: RequestHandler<undefined, TokensResponse> =
		async (req, res, next) => {
			try {
				const refreshToken = req.cookies[COOKIE_NAME] as string;
				const user = TokensService.checkToken(refreshToken);

				if (!user) {
					throw ApiError.BadRequest('Токен обновления не действительный');
				}

				const tokens = TokensService.createTokens({ userId: user.userId });

				res.cookie(COOKIE_NAME, tokens.refreshToken, {
					httpOnly: true,
					sameSite: 'none',
					secure: true,
					maxAge: COOKIE_TIME,
				});

				res.json(tokens);
			} catch (e) {
				next(e);
			}
		};

	public static login: RequestHandler<undefined, TokensResponse, LoginRequest> =
		async (req, res, next) => {
			try {
				const { login, password, remember } = req.body;
				const user = await AuthServices.loginUser(login, password);

				const cookieOptions: CookieOptions = {
					httpOnly: true,
					sameSite: 'none',
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

	public static logout: RequestHandler<undefined, StandardResponse> = (
		_,
		res
	) => {
		res.clearCookie(COOKIE_NAME);
		res.json({ resultCode: 0 });
	};

	public static refresh: RequestHandler<undefined, TokensResponse> = (
		req,
		res,
		next
	) => {
		try {
			const refreshToken = req.cookies[COOKIE_NAME];
			const tokens = TokensService.refreshTokens(refreshToken);
			if (!tokens) {
				throw ApiError.UnAuthorization();
			}
			res.cookie(COOKIE_NAME, tokens.refreshToken, {
				httpOnly: true,
				sameSite: 'none',
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
