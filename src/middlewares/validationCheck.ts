/* eslint-disable @typescript-eslint/no-explicit-any */
import { validationResult } from 'express-validator';
import { RequestHandler } from 'express';

export const validationCheck = <
	Params extends Record<string, any> | undefined = undefined,
	Response extends Record<string, any> | undefined = undefined,
	Request extends Record<string, any> | undefined = undefined
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
