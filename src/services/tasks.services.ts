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
		const taskGroupIds = (
			await TasksTable.select<{ groupId: number }>({
				filters: { authorId: userId },
				includes: ["groupId"],
			})
		).map((task) => task.groupId);
		return await TaskGroupsTable.select({
			filters: { groupId: taskGroupIds },
		});
	};
	public static createTask = async (
		userId: number,
		content: string,
		status: TaskStatus,
		groupId: number
	) => {
		const addedDate = new Date().toString();

		const newTask: TaskCreateModel = {
			date: addedDate,
			authorId: userId,
			content,
			groupId,
			status,
		};

		await TasksTable.insert(newTask);
		return await TasksTable.select({
			filters: { date: addedDate, authorId: userId },
		});
	};
}
