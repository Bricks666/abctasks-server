import { GetAllActivitiesByRoomIdQueryResult } from '../../repositories';
import { GetAllActivitiesByRoomIdResponse } from '../contracts';
import { convertActivityRecord } from './convert-activity-record';

export const convertGetAllActivitiesByRoomIdQueryResult = (
	result: GetAllActivitiesByRoomIdQueryResult
): GetAllActivitiesByRoomIdResponse => {
	const { activities, totalCount, } = result;

	return {
		totalCount,
		items: activities.map(convertActivityRecord),
	};
};
