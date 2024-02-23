import { SortOderType } from '@/shared';

export interface GetAllActivitiesByRoomIdRequest {
	readonly roomId: number;
	readonly count?: number;
	readonly page?: number;
	readonly by?: string;
	readonly type?: SortOderType;
	readonly activistIds?: number[];
	readonly sphereIds?: number[];
	readonly actionIds?: number[];
	readonly before?: string;
	readonly after?: string;
}
