import { CreateTagDto, UpdateTagDto } from '../../dto';

export interface GetAllParams {
	readonly roomId: number;
}

export interface GetOneParams {
	readonly id: number;
	readonly roomId: number;
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
