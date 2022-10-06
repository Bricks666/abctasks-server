import { validationResult } from 'express-validator';
import { RequestHandler } from 'express';

export const validationCheck = <
	Params = undefined,
	Response = undefined,
	Request = undefined
>(): RequestHandler<Params, Response, Request> => {
	return (req, _, next) => {
		try {
			if (!validationResult(req).isEmpty()) {
				validationResult(req).throw();
			}
			next();
		} catch (e) {
			next(e);
		}
	};
};
