import { Pagination } from '@/lib';
import { CreateRoomDto, UpdateRoomDto } from '../../dto';

export interface GetAllByUserParams extends Pagination {
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

export interface RemoveParams {
	readonly id: number;
}

export interface HasCanChange {
	readonly room_user: {
		canChange: boolean;
	}[];
}

export type WithCanChange<T extends HasCanChange> = Omit<T, 'room_user'> &
	T['room_user'][0];
