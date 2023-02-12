import { CreateActivityDto, GetActivitiesQueryDto } from '../../dto';

export interface GetAllByRoomIdParams extends GetActivitiesQueryDto {
	readonly roomId: number;
}

export interface CreateParams extends CreateActivityDto {
	readonly roomId: number;
}
