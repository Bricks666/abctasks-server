import { ErrorRequestHandler } from "express";
import { ApiError } from "../services";

export const errorHandler: ErrorRequestHandler = (err, _, res, _next) => {
	if (err instanceof ApiError) {
		return res.status(err.status).json({ message: err.message });
	}

	return res.status(500).json({ message: err.message });
};
