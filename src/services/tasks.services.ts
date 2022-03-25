import { getSQLDatetime } from "../utils";
import { TasksTable } from "../database";
import { TaskCreateModel, TaskModelShort, TaskStatus } from "../models";

export class TasksService {
	public static getTasks = async (
		roomId: number,
		userId: number,
		page = 1,
		countOnPage = 100
	) => {
		return await TasksTable.select({
			filters: {
				roomId: {
					operator: "=",
					value: roomId,
				},
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
	public static getTask = async (roomId: number, taskId: number) => {
		return await TasksTable.selectOne<TaskModelShort>({
			filters: {
				roomId: {
					operator: "=",
					value: roomId,
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
		roomId: number,
		userId: number,
		content: string,
		status: TaskStatus,
		groupId: number
	) => {
		const addedDate = getSQLDatetime();

		const newTask: TaskCreateModel = {
			date: addedDate,
			authorId: userId,
			roomId,
			content,
			groupId,
			status,
		};

		await TasksTable.insert(newTask);
		return await TasksTable.selectOne<TaskModelShort>({
			filters: {
				roomId: {
					operator: "=",
					value: roomId,
				},
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
	public static deleteTask = async (roomId: number, taskId: number) => {
		await TasksTable.delete({
			todoId: { operator: "=", value: taskId },
			roomId: {
				operator: "=",
				value: roomId,
			},
		});
	};
	public static editTask = async (
		roomId: number,
		taskId: number,
		newValues: Partial<TaskCreateModel>
	) => {
		await TasksTable.update(newValues, {
			todoId: { operator: "=", value: taskId },
		});
		return await TasksTable.selectOne<TaskModelShort>({
			filters: {
				roomId: {
					operator: "=",
					value: roomId,
				},
				todoId: { operator: "=", value: taskId },
			},
			joinedTable: {
				enable: true,
				joinTable: ["users"],
			},
		});
	};
}
