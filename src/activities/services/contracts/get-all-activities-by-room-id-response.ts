import { Activity } from '../../entities';

export interface GetAllActivitiesByRoomIdResponse {
	readonly totalCount: number;
	readonly items: Activity[];
}
