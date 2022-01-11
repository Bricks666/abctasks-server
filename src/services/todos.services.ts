import { RequestHandler } from "express";
import { ApiError } from ".";
import { todoDB } from "../database";
/* import {  } from "../interfaces/common"; */
import { TodoModelShort /* VerifyUserModel */ } from "../models";

/* interface GetTodosParams {
	page: number;
	count: number;
}

interface SuccessResponse {
	todos?: TodoModelShort[];
}
interface UserRequest {
	user?: VerifyUserModel;
}
 */
export const getTodos: RequestHandler = async (req, res, next) => {
	try {
		const { query } = req;
		const page = {
			page: (query.page && +query.page) || 1,
			countOnPage: (query.count && +query.count) || 10,
		};
		const user = req.body.user;

		if (!user) {
			return next(ApiError.BadRequest("User must be provided"));
		}

		/* TODO: Поправить в базе данных */
		const todos: TodoModelShort[] = await todoDB.Todos.getTodos({
			page: page,
			filters: {
				authorId: user.userId,
			},
		});

		res.status(200).json({ todos });
	} catch (e) {
		console.log(e);
	}
};
