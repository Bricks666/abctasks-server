import { HEX } from "../interfaces/common";

export interface TodoModelShort {
	readonly todoId: number;
	readonly statusId: number;
	readonly groupId: number;
	readonly authorId: number;
	readonly content: string;
	readonly date: string;
	readonly isDone: boolean;
}

export interface TodoModelFull
	extends Omit<TodoModelShort, "authorId" | "statusId" | "groupId"> {
	readonly authorName: string;
	readonly authorPhoto?: string | undefined;
	readonly groupName: string;
	readonly mainColor: HEX;
	readonly secondColor: HEX;
	readonly status: string;
}
