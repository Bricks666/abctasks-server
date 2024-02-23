import { Injectable } from '@nestjs/common';
import { ActivityAction } from '../entities';
import { ActivityActionRepository } from '../repositories';
import { convertActivityActionRecord } from './lib';

@Injectable()
export class ActivityActionsService {
	constructor(
		private readonly activityActionRepository: ActivityActionRepository
	) {}

	async getAll(): Promise<ActivityAction[]> {
		return this.activityActionRepository
			.getAll()
			.then((actions) => actions.map(convertActivityActionRecord));
	}
}
