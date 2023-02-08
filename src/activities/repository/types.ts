import { SortQueryDto } from '@/common';
import { Pagination } from '@/lib';
import { ActivitiesFiltersDto, CreateActivityDto } from '../dto';

export interface GetAllByRoomIdParams
	extends Pagination,
		ActivitiesFiltersDto,
		SortQueryDto {
	readonly roomId: number;
}

export interface GetTotalCountInRoomParams extends ActivitiesFiltersDto {
	readonly roomId: number;
}

export interface GetAllByUserIdParams extends Pagination {
	readonly userId: number;
}

export interface CreateParams extends CreateActivityDto {
	readonly roomId: number;
}
