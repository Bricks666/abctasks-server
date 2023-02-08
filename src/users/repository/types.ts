import { Pagination } from '@/lib';
import { CreateUserDto, UpdateUserDto } from '../dto';

export interface GetAllParams extends Pagination {
	readonly login?: string;
}

export interface GetOneParams {
	readonly id: number;
}

export interface GetOneByLoginParams {
	readonly login: string;
}

export interface CreateData extends CreateUserDto {}

export interface UpdateParams extends UpdateUserDto {
	readonly id: number;
}
