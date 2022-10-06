import { TasksTable } from '@/database';
import { TaskStatus, TaskProgress } from '@/models';
import { changeProgress } from '@/packages/eventBus';
import { toJSON } from 'mariadb-table-wrapper';

interface ChangeProgress {
	readonly groupId: number;
	readonly progress: TaskProgress | undefined;
}

export class ProgressServices {
	public static getTasksProgress = async (roomId: number) => {

		return await TasksTable.select<TaskProgress>({
			filters: {
				roomId: { operator: '=', value: roomId },
			},
			includes: [
				'groupId',
				{
					type: 'count',
					body: 'todoId',
					name: 'totalCount',
				},
				{
					type: 'count',
					body: {
						type: 'if',
						field: 'status',
						condition: {
							operator: '=',
							value: toJSON(TaskStatus.DONE),
						},
						yes: 'todoId',
					},
					name: 'doneCount',
				},
			],
			groupBy: ['groupId'],
		});
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
