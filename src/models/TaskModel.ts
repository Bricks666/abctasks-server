import { HEX } from "../interfaces/common";

export enum TaskStatus {
	DONE = "Done",
	IN_PROGRESS = "In Progress",
	REVIEW = "Review",
	READY = "Ready",
}

export interface TaskModelShort {
	readonly todoId: number;
	readonly roomId: number;
	readonly status: TaskStatus;
	readonly groupId: number;
	readonly authorId: number;
	readonly content: string;
	readonly date: string;
}

export interface TaskModelFull
	extends Omit<TaskModelShort, "authorId" | "groupId"> {
	readonly authorName: string;
	readonly authorPhoto?: string | undefined;
	readonly groupName: string;
	readonly mainColor: HEX;
	readonly secondColor: HEX;
}

export type TaskCreateModel = Omit<TaskModelShort, "todoId">;
