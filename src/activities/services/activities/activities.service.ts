import { Injectable } from '@nestjs/common';
import { normalizePaginationParams, PaginationResponseDto } from '@/shared';
import { ActivityDto } from '../../dto';
import { ActivityRepository } from '../../repositories';
import { CreateParams, GetAllByRoomIdParams } from './types';

@Injectable()
export class ActivitiesService {
	constructor(private readonly activitiesRepository: ActivityRepository) {}

	async getAllByRoomId(
		params: GetAllByRoomIdParams
	): Promise<PaginationResponseDto<ActivityDto>> {
		const { count, page, ...filters } = params;
		const pagination = normalizePaginationParams({ count, page, });
		const items = await this.activitiesRepository.getAllByRoomId({
			...pagination,
			...filters,
		});
		const totalCount = await this.activitiesRepository.getTotalCountInRoom({
			...pagination,
			...filters,
		});

		return {
			items,
			totalCount,
			limit: pagination.limit,
		};
	}

	async create(params: CreateParams): Promise<ActivityDto> {
		return this.activitiesRepository.create(params);
	}
}
