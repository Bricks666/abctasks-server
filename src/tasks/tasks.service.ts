import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateTaskDto, GetTasksQueryDto, TaskDto, UpdateTaskDto } from './dto';
import { TaskRepository } from './repository';

@Injectable()
export class TasksService {
	constructor(private readonly tasksRepository: TaskRepository) {}

	async getAll(roomId: number, filters: GetTasksQueryDto): Promise<TaskDto[]> {
		const where: Prisma.taskWhereInput = {
			authorId: filters.authorId,
			groupId: filters.groupId,
			createdAt: {
				gte: filters.after,
				lte: filters.before,
			},
		};
		return this.tasksRepository.getAll(roomId, where);
	}

	async getOne(roomId: number, id: number): Promise<TaskDto> {
		const task = await this.tasksRepository.getOne(id, roomId);

		if (!task) {
			throw new NotFoundException('Task was not found');
		}

		return task;
	}

	async create(
		roomId: number,
		authorId: number,
		dto: CreateTaskDto
	): Promise<TaskDto> {
		return this.tasksRepository.create(roomId, authorId, dto);
	}

	/**
	 * TODO: Сделать сначала поиск, а потом уже изменение, чтобы ошибка кидалась до изменений
	 */
	async update(
		roomId: number,
		id: number,
		dto: UpdateTaskDto
	): Promise<TaskDto> {
		return this.tasksRepository.update(id, roomId, dto);
	}

	async remove(roomId: number, id: number): Promise<boolean> {
		await this.tasksRepository.remove(id, roomId);

		return true;
	}
}
