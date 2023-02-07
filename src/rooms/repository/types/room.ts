import { CreateRoomDto, UpdateRoomDto } from '../../dto';

export interface GetAllFilters {
	readonly userId: number;
}

export interface GetAllByUserFilters {
	readonly userId: number;
}

export interface GetOneFilters {
	readonly id: number;
	readonly userId: number;
}

export interface CreateData extends CreateRoomDto {
	readonly userId: number;
}

export interface CreateFilters {
	readonly userId: number;
}

export interface UpdateData extends UpdateRoomDto {}

export interface UpdateFilters {
	readonly id: number;
	readonly userId: number;
}

export interface RemoveFilters {
	readonly id: number;
}

export interface HasCanChange {
	readonly room_user: {
		canChange: boolean;
	}[];
}

export type WithCanChange<T extends HasCanChange> = Omit<T, 'room_user'> &
	T['room_user'][0];
