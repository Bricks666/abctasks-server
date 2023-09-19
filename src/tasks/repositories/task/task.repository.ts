import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from '@/database';
import { TaskDto } from '../../dto';
import {
	CreateParams,
	GetAllParams,
	GetOneParams,
	RemoveParams,
	UpdateParams
} from './types';
import { prepareWhere } from './lib';

@Injectable()
export class TaskRepository {
	constructor(private readonly databaseService: DatabaseService) {}

	async getAll(params: GetAllParams): Promise<TaskDto[]> {
		const { roomId, by, type = 'asc', ...filters } = params;

		const where: Prisma.TaskWhereInput = prepareWhere(filters);

		const orderBy: Prisma.TaskOrderByWithRelationInput = {};

		if (by) {
			orderBy[by] = type;
		}

		const tasks = await this.databaseService.task.findMany({
			where: {
				...where,
				roomId,
			},
			orderBy,
		});

		return tasks;
	}

	async getOne(params: GetOneParams): Promise<TaskDto | null> {
		return this.databaseService.task.findUnique({
			where: {
				id_roomId: params,
			},
		});
	}

	async create(params: CreateParams): Promise<TaskDto> {
		const { tagIds, ...rest } = params;
		return this.databaseService.task.create({
			data: {
				...rest,
				task_tag: {
					createMany: {
						data: tagIds.map((tagId) => ({ tagId, })),
					},
				},
			},
		});
	}

	async update(params: UpdateParams): Promise<TaskDto> {
		const { id, roomId, tagIds, ...data } = params;

		return this.databaseService.task.update({
			where: {
				id_roomId: {
					id,
					roomId,
				},
			},
			data: {
				...data,
				task_tag: {
					createMany: {
						skipDuplicates: true,
						data: tagIds ? tagIds.map((tagId) => ({ tagId, })) : [],
					},
				},
			},
		});
	}

	async remove(params: RemoveParams): Promise<void> {
		await this.databaseService.task.delete({
			where: {
				id_roomId: params,
			},
		});
	}
}
