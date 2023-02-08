import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskDto } from './dto';
import { TaskRepository } from './repository';
import {
	CreateParams,
	GetAllParams,
	GetOneParams,
	RemoveParams,
	UpdateParams
} from './types';

@Injectable()
export class TasksService {
	constructor(private readonly tasksRepository: TaskRepository) {}

	async getAll(params: GetAllParams): Promise<TaskDto[]> {
		return this.tasksRepository.getAll(params);
	}

	async getOne(params: GetOneParams): Promise<TaskDto> {
		const task = await this.tasksRepository.getOne(params);

		if (!task) {
			throw new NotFoundException('Task was not found');
		}

		return task;
	}

	async create(params: CreateParams): Promise<TaskDto> {
		return this.tasksRepository.create(params);
	}

	/**
	 * TODO: Сделать сначала поиск, а потом уже изменение, чтобы ошибка кидалась до изменений
	 */
	async update(params: UpdateParams): Promise<TaskDto> {
		return this.tasksRepository.update(params);
	}

	async remove(params: RemoveParams): Promise<boolean> {
		await this.tasksRepository.remove(params);

		return true;
	}
}
