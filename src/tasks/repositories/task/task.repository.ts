import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from '@/database';
import { SECURITY_USER_SELECT } from '@/users';
import { TaskDto } from '../../dto';
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
	task_tag: {
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
			select,
		});

		return tasks.map(TaskRepository.map);
	}

	async getOne(params: GetOneParams): Promise<TaskDto | null> {
		const task = await this.databaseService.task.findUnique({
			where: {
				id_roomId: params,
			},
			select,
		});

		return task ? TaskRepository.map(task) : null;
	}

	async create(params: CreateParams): Promise<TaskDto> {
		const { tagIds, ...rest } = params;
		const task = await this.databaseService.task.create({
			data: {
				...rest,
				task_tag: {
					createMany: {
						data: tagIds.map((tagId) => ({ tagId, })),
					},
				},
			},
			select,
		});

		return task ? TaskRepository.map(task) : null;
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
				task_tag: {
					createMany: {
						skipDuplicates: true,
						data: tagIds ? tagIds.map((tagId) => ({ tagId, })) : [],
					},
				},
			},
			select,
		});

		return task ? TaskRepository.map(task) : null;
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
				tagIds: {
					isEmpty: true,
				},
			},
		});
	}

	private static map(task: any): TaskDto {
		const { task_tag, author, ...rest } = task;

		return {
			...rest,
			author: author.user,
			tags: task_tag.map((task_tag) => task_tag.tag),
		};
	}
}
