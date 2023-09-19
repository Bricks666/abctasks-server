import { PaginationQueryDto } from '@/shared';
import { CreateCommentDto, UpdateCommentDto } from '../../dto';

export interface GetAllParams extends PaginationQueryDto {
	readonly roomId: number;
	readonly taskId: number;
}

export interface GetOneParams {
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
	readonly id: number;
	readonly taskId: number;
	readonly roomId: number;
}

export interface RemoveParams {
	readonly id: number;
	readonly taskId: number;
	readonly roomId: number;
}
