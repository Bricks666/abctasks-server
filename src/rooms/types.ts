import { CreateRoomDto, UpdateRoomDto } from './dto';

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

export interface GetUsersParams {
	readonly id: number;
}

export interface AddUserParams {
	readonly id: number;
	readonly userId: number;
}

export interface GenerateAddUserLink {
	readonly id: number;
}

export interface RemoveUserParams {
	readonly id: number;
	readonly userId: number;
}

export interface RoomExistsUserParams {
	readonly roomId: number;
	readonly userId: number;
}

export interface RemoveParams {
	readonly id: number;
}
