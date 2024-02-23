import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@/database/database.service';
import {
	ActivityActionRecord,
	CreateActivityActionQuery,
	GetOneActivityActionQuery
} from './contracts';
import {
	convertCreateActivitySphereQuery,
	convertGetOneActivityActionQuery,
	convertGetallActivityActionQuery
} from './lib';

@Injectable()
export class ActivityActionRepository {
	constructor(private readonly databaseService: DatabaseService) {}

	async getAll(): Promise<ActivityActionRecord[]> {
		return this.databaseService.activityAction.findMany(
			convertGetallActivityActionQuery()
		);
	}

	async getOne(
		query: GetOneActivityActionQuery
	): Promise<ActivityActionRecord | null> {
		return this.databaseService.activityAction.findFirst(
			convertGetOneActivityActionQuery(query)
		);
	}

	async create(
		query: CreateActivityActionQuery
	): Promise<ActivityActionRecord> {
		return this.databaseService.activityAction.create(
			convertCreateActivitySphereQuery(query)
		);
	}
}
