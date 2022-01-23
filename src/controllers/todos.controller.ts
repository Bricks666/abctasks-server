import { RequestHandler } from "express";

export const getTodos: RequestHandler = (req, res, next) => {
	console.log(req, res, next);
};
