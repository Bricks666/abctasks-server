import { ActivityRecord } from './activity-record';

export interface GetAllActivitiesByRoomIdQueryResult {
	readonly activities: ActivityRecord[];
	readonly totalCount: number;
}
