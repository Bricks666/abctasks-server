import { CreateRoomDto, UpdateRoomDto } from './dto';

export interface GetAllData {
	readonly userId: number;
}

export interface GetOneData {
	readonly id: number;
	readonly userId: number;
}

export interface CreateData extends CreateRoomDto {
	readonly userId: number;
}

export interface UpdateData extends UpdateRoomDto {
	readonly id: number;
	readonly userId: number;
}

export interface GetUsersData {
	readonly id: number;
}

export interface AddUserData {
	readonly id: number;
	readonly userId: number;
}

export interface RemoveUserData {
	readonly id: number;
	readonly userId: number;
}

export interface RoomExistsUserData {
	readonly roomId: number;
	readonly userId: number;
}

export interface RemoveData {
	readonly id: number;
}
