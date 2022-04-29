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
	public static getTasksProgress = async (roomId: number) => {
		const tasksGroup = await TasksTable.select<GroupTotalTask>({
			filters: {
				roomId: { operator: "=", value: roomId },
			},
			includes: ["groupId"],
			count: [["*", "totalCount"]],
			groupBy: ["groupId"],
		});
		const doneTasks = await TasksTable.select<GroupDoneTask>({
			filters: {
				roomId: {
					operator: "=",
					value: roomId,
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

	public static subscribeChangeProgress(
		roomId: number,
		listener: (progress: ChangeProgress[]) => unknown
	) {
		return changeProgress.subscribe(async (room, groupIds) => {
			if (roomId === room) {
				const progresses: ChangeProgress[] = [];
				const userProgresses = await this.getTasksProgress(roomId);
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

	public static changeProgress(roomId: number, ...groupIds: number[]) {
		changeProgress.broadcast(roomId, groupIds);
	}
}
