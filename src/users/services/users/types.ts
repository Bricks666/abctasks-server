import {
	CreateUserDto,
	GetUserDto,
	GetUsersQueryDto,
	UpdateUserDto
} from '../../dto';

export interface GetAllParams extends GetUsersQueryDto {}

export interface GetOneParams extends GetUserDto {}

export interface CreateParams extends CreateUserDto {}

export interface IsActivatedParams {
	readonly id: number;
}

export interface ActivateParams {
	readonly id: number;
}

export interface GetInsecureParams {
	readonly email: string;
}

export interface UpdateParas extends UpdateUserDto {
	readonly id: number;
}
