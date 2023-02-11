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

export interface InviteUserParams {
	readonly id: number;
	readonly userId: number;
}

export interface ApproveInviteParams {
	readonly id: number;
	readonly userId: number;
}

export interface RejectInviteParams {
	readonly id: number;
	readonly userId: number;
}

export interface GenerateInviteHashParams {
	readonly id: number;
}

export interface RemoveUserParams {
	readonly id: number;
	readonly userId: number;
}

export interface IsOwnerParams {
	readonly roomId: number;
	readonly userId: number;
}

export interface IsExistsParams {
	readonly roomId: number;
	readonly userId: number;
}

export interface RemoveParams {
	readonly id: number;
}
