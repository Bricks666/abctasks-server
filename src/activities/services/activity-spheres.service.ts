import { Injectable } from '@nestjs/common';
import { ActivitySphere } from '../entities';
import { ActivitySphereRepository } from '../repositories';
import { convertActivitySphereRecord } from './lib';

@Injectable()
export class ActivitySpheresService {
	constructor(
		private readonly activitySphereRepository: ActivitySphereRepository
	) {}

	async getAll(): Promise<ActivitySphere[]> {
		return this.activitySphereRepository
			.getAll()
			.then((spheres) => spheres.map(convertActivitySphereRecord));
	}
}
