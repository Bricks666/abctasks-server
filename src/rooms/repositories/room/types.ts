import { Pagination } from '@/shared';
import { CreateRoomDto, UpdateRoomDto } from '../../dto';

export interface GetAllByUserParams extends Pagination {
	readonly userId: number;
}

export interface GetOneParams {
	readonly id: number;
}

export interface CreateParams extends CreateRoomDto {
	readonly userId: number;
}

export interface UpdateParams extends UpdateRoomDto {
	readonly id: number;
}

export interface RemoveParams {
	readonly id: number;
}
