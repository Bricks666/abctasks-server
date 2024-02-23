import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaDatabaseService } from '@bricks-ether/server-utils/nestjs';
import { SECURITY_USER_SELECT } from '@/users/repositories';
import { TaskDto } from '../../dto';
import { convertTaskRecordToTaskDto } from '../lib';
import {
	CreateParams,
	GetAllParams,
	GetOneParams,
	RemoveParams,
	UpdateParams,
	RemoveTasksWithoutTagParams
} from './types';
import { prepareWhere } from './lib';

const select = {
	id: true,
	roomId: true,
	title: true,
	description: true,
	status: true,
	tags: {
		select: {
			tag: true,
		},
	},
	author: {
		select: {
			user: { select: SECURITY_USER_SELECT, },
		},
	},
	updatedAt: true,
	createdAt: true,
} satisfies Prisma.TaskSelect;

@Injectable()
export class TaskRepository {
	constructor(private readonly databaseService: PrismaDatabaseService) {}

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
			select,
		});

		return tasks.map(convertTaskRecordToTaskDto);
	}

	async getOne(params: GetOneParams): Promise<TaskDto | null> {
		const task = await this.databaseService.task.findUnique({
			where: {
				id_roomId: params,
			},
			select,
		});

		return task ? convertTaskRecordToTaskDto(task) : null;
	}

	async create(params: CreateParams): Promise<TaskDto> {
		const { tagIds, ...rest } = params;
		const task = await this.databaseService.task.create({
			data: {
				...rest,
				tags: {
					createMany: {
						data: tagIds.map((tagId) => ({ tagId, })),
					},
				},
			},
			select,
		});

		return task ? convertTaskRecordToTaskDto(task) : null;
	}

	async update(params: UpdateParams): Promise<TaskDto> {
		const { id, roomId, tagIds, ...data } = params;

		const task = await this.databaseService.task.update({
			where: {
				id_roomId: {
					id,
					roomId,
				},
			},
			data: {
				...data,
				tags: {
					createMany: {
						skipDuplicates: true,
						data: tagIds ? tagIds.map((tagId) => ({ tagId, })) : [],
					},
				},
			},
			select,
		});

		return task ? convertTaskRecordToTaskDto(task) : null;
	}

	async remove(params: RemoveParams): Promise<void> {
		await this.databaseService.task.delete({
			where: {
				id_roomId: params,
			},
		});
	}

	async removeTasksWithoutTag(
		params: RemoveTasksWithoutTagParams
	): Promise<void> {
		await this.databaseService.task.deleteMany({
			where: {
				roomId: params.roomId,
				tags: {
					none: {
						roomId: params.roomId,
					},
				},
			},
		});
	}
}
