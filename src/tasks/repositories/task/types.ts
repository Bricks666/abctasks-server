import { CreateTaskDto, GetTasksDto, UpdateTaskDto } from '../../dto';

export interface GetAllParams extends GetTasksDto {
	readonly roomId: number;
}

export interface GetOneParams {
	readonly id: number;
	readonly roomId: number;
}

export interface CreateParams extends CreateTaskDto {
	readonly roomId: number;
	readonly authorId: number;
}

export interface UpdateParams extends UpdateTaskDto {
	readonly id: number;
	readonly roomId: number;
}

export interface RemoveParams {
	readonly id: number;
	readonly roomId: number;
}

export interface RemoveTasksWithoutTagParams {
	readonly roomId: number;
}
