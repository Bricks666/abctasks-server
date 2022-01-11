import { HEX } from "../interfaces/common";

export interface TodoModelShort {
	todoId: number;
	statusId: number;
	groupId: number;
	authorId: number;
	content: string;
	date: string;
	isDone: boolean;
}

export interface TodoModelFull
	extends Omit<TodoModelShort, "authorId" | "statusId" | "groupId"> {
	authorName: string;
	authorPhoto?: string | undefined;
	groupName: string;
	mainColor: HEX;
	secondColor: HEX;
	status: string;
}
