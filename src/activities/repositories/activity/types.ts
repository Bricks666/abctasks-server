import { SortQueryDto, Pagination } from '@/shared';
import { ActivitiesFiltersDto } from '../../dto';

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

export interface CreateParams {
	readonly roomId: number;
	readonly activistId: number;
	readonly sphereName: string;
	readonly actionName: string;
}
