import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateActivityDto } from './dto';
import { Activity, ActivitySphere } from './models';

@Injectable()
export class ActivitiesService {
	constructor(
		@InjectModel(Activity)
		private readonly activitiesRepository: typeof Activity,
		@InjectModel(ActivitySphere)
		private readonly activitySpheresRepository: typeof ActivitySphere
	) {}

	async getAll(roomId: number): Promise<Activity[]> {
		return this.activitiesRepository.findAll({
			where: {
				roomId,
			},
			include: [
				{
					model: ActivitySphere,
				}
			],
			attributes: {
				exclude: ['sphereId'],
			},

			limit: 15,
			order: [['id', 'DESC']],
		});
	}

	async getOne(roomId: number, id: number): Promise<Activity> {
		const activity = await this.activitiesRepository.findOne({
			where: {
				roomId,
				id,
			},
			include: [
				{
					model: ActivitySphere,
					attributes: ['name'],
				}
			],
			attributes: {
				exclude: ['sphereId'],
			},
		});

		if (!activity) {
			throw new NotFoundException();
		}

		return activity;
	}

	async create(roomId: number, dto: CreateActivityDto): Promise<Activity> {
		const [sphere] = await this.activitySpheresRepository.findOrCreate({
			where: {
				name: dto.sphereName,
			},
			defaults: {
				name: dto.sphereName,
			},
		});
		return this.activitiesRepository.create({
			roomId,
			activistId: dto.activistId,
			action: dto.action,
			sphereId: sphere.id,
		});
	}
}
