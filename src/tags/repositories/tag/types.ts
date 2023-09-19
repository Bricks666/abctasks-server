import { CreateTagDto, UpdateTagDto } from '../../dto';

export interface GetAllParams {
	readonly roomId: number;
}

export interface GetOneParams {
	readonly roomId: number;
	readonly id: number;
}

export interface CreateParams extends CreateTagDto {
	readonly roomId: number;
}

export interface UpdateParams extends UpdateTagDto {
	readonly id: number;
	readonly roomId: number;
}

export interface RemoveParams {
	readonly id: number;
	readonly roomId: number;
}
