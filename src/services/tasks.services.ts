import { TaskGroupsTable, TasksTable } from "../database";
import { TaskCreateModel, TaskStatus } from "../models";

interface GroupTotalTask {
	readonly groupId: number;
	readonly totalCount: number;
}

interface GroupDoneTask {
	readonly groupId: number;
	readonly doneCount: number;
}

type TaskProgress = GroupDoneTask & GroupTotalTask;

export class TasksService {
	public static getTasks = async (
		userId: number,
		page = 1,
		countOnPage = 100
	) => {
		return await TasksTable.select({
			filters: {
				authorId: userId,
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
	public static getTasksProgress = async (userId: number) => {
		const tasksGroup = await TasksTable.select<GroupTotalTask>({
			filters: {
				authorId: userId,
			},
			includes: ["groupId"],
			count: [["*", "totalCount"]],
			groupBy: ["groupId"],
		});
		const doneTasks = await TasksTable.select<GroupDoneTask>({
			filters: {
				authorId: userId,
				status: TaskStatus.DONE,
			},
			includes: ["groupId"],
			count: [["*", "doneCount"]],
			groupBy: ["groupId"],
		});

		const taskProgress: TaskProgress[] = tasksGroup.map<TaskProgress>(
			(total) => {
				const doneGroup = doneTasks.find(
					(group) => group.groupId === total.groupId
				);
				return {
					...total,
					doneCount: doneGroup?.doneCount || 0,
				};
			}
		);

		return taskProgress;
	};
	public static getTaskGroups = async (userId: number) => {
		return await TaskGroupsTable.select({
			filters: { ownerId: userId },
			excludes: ["ownerId"],
		});
	};
	public static createTask = async (
		userId: number,
		content: string,
		status: TaskStatus,
		groupId: number
	) => {
		const addedDate = new Date().toISOString().slice(0, -5);

		const newTask: TaskCreateModel = {
			date: addedDate,
			authorId: userId,
			content,
			groupId,
			status,
		};

		await TasksTable.insert(newTask);
		return await TasksTable.selectOne({
			filters: { date: addedDate, authorId: userId },
			joinedTable: {
				enable: true,
				joinTable: ["users"],
			},
		});
	};
	public static deleteTask = async (taskId: number) => {
		await TasksTable.delete({
			todoId: taskId,
		});
	};
	public static editTask = async (
		taskId: number,
		newValues: Partial<TaskCreateModel>
	) => {
		await TasksTable.update(newValues, { todoId: taskId });
		return await TasksTable.selectOne({
			filters: { todoId: taskId },
			joinedTable: {
				enable: true,
				joinTable: ["users"],
			},
		});
	};
}
