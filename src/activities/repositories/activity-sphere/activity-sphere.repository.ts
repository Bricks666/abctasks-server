import { Injectable } from '@nestjs/common';
import { PrismaDatabaseService } from '@bricks-ether/server-utils/nestjs';
import { ActivitySphereDto } from '../../dto';
import { CreateParams, GetOneParams } from './types';

@Injectable()
export class ActivitySphereRepository {
	constructor(private readonly databaseService: PrismaDatabaseService) {}

	async getAll(): Promise<ActivitySphereDto[]> {
		return this.databaseService.activitySphere.findMany();
	}

	async getOne(params: GetOneParams): Promise<ActivitySphereDto | null> {
		return this.databaseService.activitySphere.findFirst({
			where: {
				name: params.name,
			},
		});
	}

	async create(params: CreateParams): Promise<ActivitySphereDto | null> {
		return this.databaseService.activitySphere.create({
			data: {
				name: params.name,
			},
		});
	}
}
