import { Injectable } from '@nestjs/common';
import { normalizePaginationParams } from '@/utils';
import { ActivityDto, CreateActivityDto } from './dto';
import { ActivityRepository } from './repository';

@Injectable()
export class ActivitiesService {
	constructor(private readonly activitiesRepository: ActivityRepository) {}

	async getAllByRoomId(roomId: number): Promise<ActivityDto[]> {
		const pagination = normalizePaginationParams({});
		return this.activitiesRepository.getAllByRoomId(roomId, pagination);
	}

	async create(roomId: number, dto: CreateActivityDto): Promise<ActivityDto> {
		return this.activitiesRepository.create(roomId, dto);
	}
}
