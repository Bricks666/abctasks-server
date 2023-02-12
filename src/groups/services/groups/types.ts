import { CreateGroupDto, UpdateGroupDto } from '../../dto';

export interface GetAllParams {
	readonly roomId: number;
}

export interface GetOneParams {
	readonly id: number;
	readonly roomId: number;
}

export interface CreateParams extends CreateGroupDto {
	readonly roomId: number;
}

export interface UpdateParams extends UpdateGroupDto {
	readonly id: number;
	readonly roomId: number;
}

export interface RemoveParams {
	readonly id: number;
	readonly roomId: number;
}
