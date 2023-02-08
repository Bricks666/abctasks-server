import {
	CreateUserDto,
	GetUserDto,
	GetUsersQueryDto,
	UpdateUserDto
} from './dto';

export interface GetAllParams extends GetUsersQueryDto {}

export interface GetOneParams extends GetUserDto {}

export interface CreateParams extends CreateUserDto {}

export interface GetInsecureParams {
	readonly login: string;
}

export interface UpdateParas extends UpdateUserDto {
	readonly id: number;
}
