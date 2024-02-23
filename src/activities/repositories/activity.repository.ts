import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@/database/database.service';
import {
	ActivityRecord,
	CreateActivityQuery,
	GetAllActivitiesByRoomIdQuery,
	GetAllActivitiesByRoomIdQueryResult
} from './contracts';
import {
	convertCreateActivityQuery,
	convertGetAllActivitiesByRoomIdQuery,
	convertGetTotalCountByRoomIdQuery
} from './lib';

@Injectable()
export class ActivityRepository {
	constructor(private readonly databaseService: DatabaseService) {}

	async getAllByRoomId(
		query: GetAllActivitiesByRoomIdQuery
	): Promise<GetAllActivitiesByRoomIdQueryResult> {
		const [activities, totalCount] = await this.databaseService.$transaction([
			this.databaseService.activity.findMany(
				convertGetAllActivitiesByRoomIdQuery(query)
			),
			this.databaseService.activity.count(
				convertGetTotalCountByRoomIdQuery(query)
			)
		]);

		return {
			activities,
			totalCount,
		};
	}

	async create(query: CreateActivityQuery): Promise<ActivityRecord> {
		return this.databaseService.activity.create(
			convertCreateActivityQuery(query)
		);
	}
}
