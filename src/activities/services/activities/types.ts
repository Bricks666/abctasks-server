import { GetActivitiesQueryDto } from '../../dto';

export interface GetAllByRoomIdParams extends GetActivitiesQueryDto {
	readonly roomId: number;
}

export interface CreateParams {
	readonly roomId: number;
	readonly activistId: number;
	readonly sphereName: string;
	readonly actionName: string;
}
