import { todoDB } from "../database";
import { TodoStatus } from "../models";

export const getTodos = async (
	userId: number,
	todoStatus: TodoStatus,
	page = 1,
	countOnPage = 100
) => {
	console.log(todoStatus);
	return await todoDB.Todos.getTodos({
		filters: {
			authorId: userId,
			status: todoStatus,
		},
		join: true,
		page: {
			page,
			countOnPage,
		},
	});
};
