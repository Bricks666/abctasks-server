import { Injectable } from '@nestjs/common';
import { ActivitySphereDto } from '../../dto';
import { ActivitySphereRepository } from '../../repositories';

@Injectable()
export class ActivitySpheresService {
	constructor(
		private readonly activitySphereRepository: ActivitySphereRepository
	) {}

	async getAll(): Promise<ActivitySphereDto[]> {
		return this.activitySphereRepository.getAll();
	}
}
