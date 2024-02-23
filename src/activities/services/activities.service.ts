import { Injectable } from '@nestjs/common';
import { Activity } from '../entities';
import { ActivityRepository } from '../repositories';
import {
	CreateActivityRequest,
	GetAllActivitiesByRoomIdRequest,
	GetAllActivitiesByRoomIdResponse
} from './contracts';
import {
	convertActivityRecord,
	convertCreateActivityRequest,
	convertGetAllActivitiesByRoomIdQueryResult,
	convertGetAllActivitiesByRoomQuery
} from './lib';

@Injectable()
export class ActivitiesService {
	constructor(private readonly activitiesRepository: ActivityRepository) {}

	async getAllByRoomId(
		request: GetAllActivitiesByRoomIdRequest
	): Promise<GetAllActivitiesByRoomIdResponse> {
		const result = await this.activitiesRepository.getAllByRoomId(
			convertGetAllActivitiesByRoomQuery(request)
		);

		return convertGetAllActivitiesByRoomIdQueryResult(result);
	}

	async create(request: CreateActivityRequest): Promise<Activity> {
		return this.activitiesRepository
			.create(convertCreateActivityRequest(request))
			.then(convertActivityRecord);
	}
}
