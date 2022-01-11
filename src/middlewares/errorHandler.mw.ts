import { ErrorRequestHandler } from "express";
import { ApiError } from "../services";

export const errorHandler: ErrorRequestHandler = (err, _, res, _next) => {
	debugger;
	if (err instanceof ApiError) {
		return res.status(err.status).json({ message: err.message });
	}
};
