import { TasksTable } from "../database";
import {
	TaskStatus,
	GroupTotalTask,
	GroupDoneTask,
	TaskProgress,
} from "../models";
import { changeProgress } from "../packages/eventBus";

export class ProgressServices {
	public static getTasksProgress = async (userId: number) => {
		const tasksGroup = await TasksTable.select<GroupTotalTask>({
			filters: {
				authorId: { operator: "=", value: userId },
			},
			includes: ["groupId"],
			count: [["*", "totalCount"]],
			groupBy: ["groupId"],
		});
		const doneTasks = await TasksTable.select<GroupDoneTask>({
			filters: {
				authorId: {
					operator: "=",
					value: userId,
				},
				status: { operator: "=", value: TaskStatus.DONE },
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

	/* Не используются, потому что нужно придумать, как говорить, что данный прогресс больше не отображается */
	public static subscribeChangeProgress(
		userId: number,
		listener: (progress: TaskProgress[]) => unknown
	) {
		return changeProgress.subscribe(async (user, groupIds) => {
			if (userId === user) {
				const progress = (await this.getTasksProgress(userId)).filter(
					(progress) => (groupIds as number[]).includes(progress.groupId)
				);
				if (progress) {
					listener(progress);
				}
			}
		});
	}

	public static changeProgress(userId: number, ...groupIds: number[]) {
		changeProgress.broadcast(userId, groupIds);
	}
}
