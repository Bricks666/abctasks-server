import { normalizePaginatedRequest } from '@/shared';

import { GetAllActivitiesByRoomIdQuery } from '../../repositories';
import { GetAllActivitiesByRoomIdRequest } from '../contracts';
import { normalizeSortedRequest } from './normalize-sorted-request';

export const convertGetAllActivitiesByRoomQuery = (
	request: GetAllActivitiesByRoomIdRequest
): GetAllActivitiesByRoomIdQuery => {
	const {
		roomId,
		actionIds,
		activistIds,
		after,
		before,
		by,
		count,
		page,
		sphereIds,
		type,
	} = request;

	return {
		roomId,
		...normalizeSortedRequest({ by, type, }),
		...normalizePaginatedRequest({ page, count, }),
		actionIds,
		activistIds,
		after,
		before,
		sphereIds,
	};
};
