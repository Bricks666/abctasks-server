import { RequestHandler } from "express";
import { ApiError, TokensService } from "../services";

export const accessVerify: RequestHandler = (req, _, next) => {
	try {
		const accessToken = req.headers.authorization?.split(" ")[1];

		if (!accessToken) {
			throw ApiError.BadRequest("Not Access Token");
		}

		const user = TokensService.checkToken(accessToken);

		if (!user) {
			throw ApiError.NoAccess();
		}

		req.body.user = user;

		next();
	} catch (e) {
		next(e);
	}
};
