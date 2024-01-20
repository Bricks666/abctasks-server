import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@/database/database.service';
import { ActivityActionDto } from '../../dto';
import { CreateParams, GetOneParams } from './types';

@Injectable()
export class ActivityActionRepository {
	constructor(private readonly databaseService: DatabaseService) {}

	async getAll(): Promise<ActivityActionDto[]> {
		return this.databaseService.activityAction.findMany();
	}

	async getOne(params: GetOneParams): Promise<ActivityActionDto | null> {
		return this.databaseService.activityAction.findFirst({
			where: {
				name: params.name,
			},
		});
	}

	async create(params: CreateParams): Promise<ActivityActionDto | null> {
		return this.databaseService.activityAction.create({
			data: {
				name: params.name,
			},
		});
	}
}
