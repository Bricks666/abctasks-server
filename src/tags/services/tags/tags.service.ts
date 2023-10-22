import { Injectable, NotFoundException } from '@nestjs/common';
import { TasksService } from '@/tasks/services';
import { TagDto } from '../../dto';
import { TagRepository } from '../../repositories';
import {
	CreateParams,
	GetAllParams,
	GetOneParams,
	RemoveParams,
	UpdateParams
} from './types';

@Injectable()
export class TagsService {
	constructor(
		private readonly tagRepository: TagRepository,
		private readonly tasksService: TasksService
	) {}

	async getAll(params: GetAllParams): Promise<TagDto[]> {
		return this.tagRepository.getAll(params);
	}

	async getOne(params: GetOneParams): Promise<TagDto> {
		const group = await this.tagRepository.getOne(params);

		if (!group) {
			throw new NotFoundException('Tag was not found');
		}

		return group;
	}

	async create(params: CreateParams): Promise<TagDto> {
		return this.tagRepository.create(params);
	}

	async update(params: UpdateParams): Promise<TagDto> {
		return this.tagRepository.update(params);
	}

	async remove(params: RemoveParams): Promise<boolean> {
		await this.tagRepository.remove(params);
		await this.tasksService.removeTasksWithoutTag(params);

		return true;
	}
}
