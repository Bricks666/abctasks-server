import { getSQLDatetime } from "../utils";
import { TasksTable } from "../database";
import { TaskCreateModel, TaskModelShort, TaskStatus } from "../models";

export class TasksService {
	public static getTasks = async (
		userId: number,
		page = 1,
		countOnPage = 100
	) => {
		return await TasksTable.select({
			filters: {
				authorId: {
					operator: "=",
					value: userId,
				},
			},
			joinedTable: {
				enable: true,
				joinTable: ["users"],
			},
			limit: {
				page,
				countOnPage,
			},
			excludes: {
				users: ["password"],
				todos: ["isDone", "authorId"],
			},
		});
	};
	public static getTask = async (userId: number, taskId: number) => {
		return await TasksTable.selectOne<TaskModelShort>({
			filters: {
				authorId: {
					operator: "=",
					value: userId,
				},
				todoId: {
					operator: "=",
					value: taskId,
				},
			},
			joinedTable: {
				enable: true,
				joinTable: ["users"],
			},
			excludes: {
				users: ["password"],
				todos: ["isDone", "authorId"],
			},
		});
	};

	public static createTask = async (
		userId: number,
		content: string,
		status: TaskStatus,
		groupId: number
	) => {
		const addedDate = getSQLDatetime();

		const newTask: TaskCreateModel = {
			date: addedDate,
			authorId: userId,
			content,
			groupId,
			status,
		};

		await TasksTable.insert(newTask);
		return await TasksTable.selectOne<TaskModelShort>({
			filters: {
				date: {
					operator: "=",
					value: addedDate,
				},
				authorId: { operator: "=", value: userId },
			},
			joinedTable: {
				enable: true,
				joinTable: ["users"],
			},
		});
	};
	public static deleteTask = async (taskId: number) => {
		await TasksTable.delete({
			todoId: { operator: "=", value: taskId },
		});
	};
	public static editTask = async (
		taskId: number,
		newValues: Partial<TaskCreateModel>
	) => {
		await TasksTable.update(newValues, {
			todoId: { operator: "=", value: taskId },
		});
		return await TasksTable.selectOne<TaskModelShort>({
			filters: { todoId: { operator: "=", value: taskId } },
			joinedTable: {
				enable: true,
				joinTable: ["users"],
			},
		});
	};
}
