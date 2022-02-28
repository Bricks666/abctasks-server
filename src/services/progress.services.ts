import { TasksTable } from "../database";
import {
	TaskStatus,
	GroupTotalTask,
	GroupDoneTask,
	TaskProgress,
} from "../models";
import { changeProgress } from "../packages/eventBus";

interface ChangeProgress {
	readonly groupId: number;
	readonly progress: TaskProgress | undefined;
}

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
		listener: (progress: ChangeProgress[]) => unknown
	) {
		return changeProgress.subscribe(async (user, groupIds) => {
			if (userId === user) {
				const progresses: ChangeProgress[] = [];
				const userProgresses = await this.getTasksProgress(userId);
				(groupIds as number[]).forEach((groupId) => {
					progresses.push({
						groupId,
						progress: userProgresses.find(
							(progress) => progress.groupId === groupId
						),
					});
				});

				if (progresses.length) {
					listener(progresses);
				}
			}
		});
	}

	public static changeProgress(userId: number, ...groupIds: number[]) {
		changeProgress.broadcast(userId, groupIds);
	}
}
