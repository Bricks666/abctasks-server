import { RoomIdParam } from "@/interfaces/param";
import { RequestWithUser } from "@/interfaces/request";
import { TaskCreateModel, TaskModel } from "@/models";

export interface TasksResponse {
	readonly tasks: TaskModel[];
}

export interface TaskResponse {
	readonly task: TaskModel;
}

export interface DeleteTaskResponse {
	readonly taskId: number;
	readonly roomId: number;
}

export interface TaskRequest
	extends RequestWithUser,
		Omit<TaskCreateModel, "date" | "roomId" | "authorId"> {}

export interface TaskParams extends RoomIdParam {
	readonly id: string;
}
