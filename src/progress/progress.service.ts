import { col, fn, Op } from 'sequelize';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Task } from '@/tasks/models';
import { ProgressDto } from './dto';

@Injectable()
export class ProgressService {
	constructor(
		@InjectModel(Task) private readonly tasksRepository: typeof Task
	) {}

	async getAll(roomId: number) {
		return this.tasksRepository.findAll({
			where: {
				roomId,
			},
			attributes: [
				'groupId',
				[fn('count', col(`id`)), 'totalCount'],
				[
					fn(
						'count',
						fn('if', { status: { [Op.eq]: 'done' } }, col(`id`), null)
					),
					'completedCount',
				],
			],
			group: 'groupId',
		}) as unknown as Promise<ProgressDto[]>;
	}
}
