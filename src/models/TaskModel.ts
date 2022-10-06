export enum TaskStatus {
	DONE,
	IN_PROGRESS,
	REVIEW,
	READY,
}

export interface TaskModel {
	readonly todoId: number;
	readonly roomId: number;
	readonly status: TaskStatus;
	readonly groupId: number;
	readonly authorId: number;
	readonly content: string;
	readonly date: string;
}

export type TaskCreateModel = Omit<TaskModel, 'todoId'>;
