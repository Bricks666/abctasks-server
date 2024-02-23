import { PaginatedRequestDto, SortedRequestDto } from '@/shared';
import { GetAllActivitiesByRoomIdRequest } from '../../services';
import { ActivitiesFiltersRequestDto } from '../contracts';

export const convertGetAllActivitiesByRoomIdRequestDto = (
	roomId: number,
	filters: ActivitiesFiltersRequestDto,
	pagination: PaginatedRequestDto,
	sort: SortedRequestDto
): GetAllActivitiesByRoomIdRequest => {
	return {
		roomId,
		...pagination,
		...sort,
		...filters,
	};
};
