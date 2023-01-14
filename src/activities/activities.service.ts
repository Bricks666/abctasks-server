import { Injectable } from '@nestjs/common';
import { normalizePaginationParams } from '@/utils';
import { ActivityDto, CreateActivityDto, GetActivitiesQueryDto } from './dto';
import { ActivityRepository } from './repository';
import { ItemsResponse } from '@/types';

@Injectable()
export class ActivitiesService {
	constructor(private readonly activitiesRepository: ActivityRepository) {}

	async getAllByRoomId(
		roomId: number,
		filters: GetActivitiesQueryDto
	): Promise<ItemsResponse<ActivityDto>> {
		const { count, page, ...f } = filters;
		const pagination = normalizePaginationParams({ count, page, });
		const items = await this.activitiesRepository.getAllByRoomId(
			roomId,
			f,
			pagination
		);
		const totalCount = await this.activitiesRepository.getTotalCountInRoom(
			roomId,
			f
		);

		return {
			items,
			totalCount,
			limit: pagination.limit,
		};
	}

	async create(roomId: number, dto: CreateActivityDto): Promise<ActivityDto> {
		return this.activitiesRepository.create(roomId, dto);
	}
}
