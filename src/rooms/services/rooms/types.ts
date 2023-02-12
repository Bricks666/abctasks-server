import { CreateRoomDto, UpdateRoomDto } from '../../dto';

export interface GetAllParams {
	readonly userId: number;
}

export interface GetOneParams {
	readonly id: number;
	readonly userId: number;
}

export interface CreateParams extends CreateRoomDto {
	readonly userId: number;
}

export interface UpdateParams extends UpdateRoomDto {
	readonly id: number;
	readonly userId: number;
}

export interface IsOwnerParams {
	readonly id: number;
	readonly userId: number;
}

export interface RemoveParams {
	readonly id: number;
}
