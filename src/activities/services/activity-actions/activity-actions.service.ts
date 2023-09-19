import { Injectable } from '@nestjs/common';
import { ActivityActionDto } from '../../dto';
import { ActivityActionRepository } from '../../repositories';

@Injectable()
export class ActivityActionsService {
	constructor(
		private readonly activityActionRepository: ActivityActionRepository
	) {}

	async getAll(): Promise<ActivityActionDto[]> {
		return this.activityActionRepository.getAll();
	}
}
