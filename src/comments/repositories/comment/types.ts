import { Pagination } from '@/shared';
import { CreateCommentDto, UpdateCommentDto } from '../../dto';

export interface GetAllParams extends Pagination {
	readonly roomId: number;
	readonly taskId: number;
}

export interface getOneParams {
	readonly roomId: number;
	readonly taskId: number;
	readonly id: number;
}

export interface CreateParams extends CreateCommentDto {
	readonly roomId: number;
	readonly taskId: number;
	readonly authorId: number;
}

export interface UpdateParams extends UpdateCommentDto {
	readonly roomId: number;
	readonly taskId: number;
	readonly id: number;
}

export interface RemoveParams {
	readonly roomId: number;
	readonly taskId: number;
	readonly id: number;
}
