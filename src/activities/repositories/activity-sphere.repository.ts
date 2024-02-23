import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@/database/database.service';
import {
	convertCreateActivitySphereQuery,
	convertGetOneActivitySphereQuery,
	convertGetallActivitySphereQuery
} from './lib';
import {
	ActivitySphereRecord,
	CreateActivitySphereQuery,
	GetOneActivitySphereQuery
} from './contracts';

@Injectable()
export class ActivitySphereRepository {
	constructor(private readonly databaseService: DatabaseService) {}

	async getAll(): Promise<ActivitySphereRecord[]> {
		return this.databaseService.activitySphere.findMany(
			convertGetallActivitySphereQuery()
		);
	}

	async getOne(
		query: GetOneActivitySphereQuery
	): Promise<ActivitySphereRecord | null> {
		return this.databaseService.activitySphere.findFirst(
			convertGetOneActivitySphereQuery(query)
		);
	}

	async create(
		query: CreateActivitySphereQuery
	): Promise<ActivitySphereRecord | null> {
		return this.databaseService.activitySphere.create(
			convertCreateActivitySphereQuery(query)
		);
	}
}
