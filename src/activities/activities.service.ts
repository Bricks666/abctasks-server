import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateActivityDto } from './dto';
import { Activity } from './models';

@Injectable()
export class ActivitiesService {
	constructor(
		@InjectModel(Activity)
		private readonly activitiesRepository: typeof Activity
	) {}

	async getActivities(roomId: number): Promise<Activity[]> {
		return this.activitiesRepository.findAll({
			where: {
				roomId,
			},
		});
	}

	async getActivity(roomId: number, id: number): Promise<Activity> {
		const activity = await this.activitiesRepository.findOne({
			where: {
				roomId,
				id,
			},
		});

		if (!activity) {
			throw new NotFoundException();
		}

		return activity;
	}

	async createActivity(
		roomId: number,
		dto: CreateActivityDto
	): Promise<Activity> {
		return this.activitiesRepository.create({
			roomId,
			...dto,
		});
	}
}
