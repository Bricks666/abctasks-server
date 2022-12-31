import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto, TaskDto, UpdateTaskDto } from './dto';
import { TaskRepository } from './repository';

@Injectable()
export class TasksService {
	constructor(private readonly tasksRepository: TaskRepository) {}

	async getAll(roomId: number): Promise<TaskDto[]> {
		return this.tasksRepository.getAll(roomId);
	}

	async getOne(roomId: number, id: number): Promise<TaskDto> {
		const task = await this.tasksRepository.getOne(id, roomId);

		if (!task) {
			throw new NotFoundException();
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
