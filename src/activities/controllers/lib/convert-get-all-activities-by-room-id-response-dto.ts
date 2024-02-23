import { GetAllActivitiesByRoomIdResponse } from '../../services';
import { GetAllActivitiesByRoomIdResponseDto } from '../contracts';

export const convertGetAllActivitiesByRoomIdResponseDto = (
	response: GetAllActivitiesByRoomIdResponse
): GetAllActivitiesByRoomIdResponseDto => {
	const { items, totalCount, } = response;

	return {
		items,
		totalCount,
		count: items.length,
	};
};
