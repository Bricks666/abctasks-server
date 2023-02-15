import { Pagination } from '@/shared';
import { CreateUserDto, UpdateUserDto } from '../../dto';

export interface GetAllParams extends Pagination {
	readonly username?: string;
}

export interface GetOneParams {
	readonly id: number;
}

export interface GetOneByEmailParams {
	readonly email: string;
}

export interface CreateData extends CreateUserDto {}

export interface UpdateParams extends UpdateUserDto {
	readonly id: number;
}
export interface IsActivatedParams {
	readonly id: number;
}

export interface ActivateParams {
	readonly id: number;
}
