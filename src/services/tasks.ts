import { getSQLDatetime } from '@/utils';
import { TasksTable } from '@/database';
import { TaskCreateModel, TaskModel, TaskStatus } from '@/models';

export class TasksService {
	public static getTasks = async (roomId: number, page = 1, countOnPage = 100) => {
		return TasksTable.select({
			filters: {
				roomId: {
					operator: '=',
					value: roomId,
				},
			},
			joinedTable: {
				enable: true,
				joinTable: ['users'],
			},
			limit: {
				page,
				countOnPage,
			},
			excludes: {
				users: ['password'],
				todos: ['isDone', 'authorId'],
			},
		});
	};

	public static getTask = async (roomId: number, taskId: number) => {
		return TasksTable.selectOne<TaskModel>({
			filters: {
				roomId: {
					operator: '=',
					value: roomId,
				},
				todoId: {
					operator: '=',
					value: taskId,
				},
			},
			joinedTable: {
				enable: true,
				joinTable: ['users'],
			},
			excludes: {
				users: ['password'],
				todos: ['isDone', 'authorId'],
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
		return TasksTable.selectOne<TaskModel>({
			filters: {
				roomId: {
					operator: '=',
					value: roomId,
				},
				date: {
					operator: '=',
					value: addedDate,
				},
				authorId: { operator: '=', value: userId },
			},
			joinedTable: {
				enable: true,
				joinTable: ['users'],
			},
			excludes: {
				users: ['password'],
				todos: ['isDone', 'authorId'],
			},
		});
	};

	public static deleteTask = async (roomId: number, taskId: number) => {
		await TasksTable.delete({
			filters: {
				todoId: { operator: '=', value: taskId },
				roomId: {
					operator: '=',
					value: roomId,
				},
			},
		});
	};

	public static editTask = async (
		roomId: number,
		taskId: number,
		newValues: Partial<TaskCreateModel>
	) => {
		await TasksTable.update(newValues, {
			filters: {
				todoId: { operator: '=', value: taskId },
			},
		});
		return this.getTask(roomId, taskId);
	};
}
