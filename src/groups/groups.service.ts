import { Injectable, NotFoundException } from '@nestjs/common';
import { GroupDto } from './dto';
import { GroupRepository } from './repository';
import {
	CreateParams,
	GetAllParams,
	GetOneParams,
	RemoveParams,
	UpdateParams
} from './types';

@Injectable()
export class GroupsService {
	constructor(private readonly groupRepository: GroupRepository) {}

	async getAll(params: GetAllParams): Promise<GroupDto[]> {
		return this.groupRepository.getAll(params);
	}

	async getOne(params: GetOneParams): Promise<GroupDto> {
		const group = await this.groupRepository.getOne(params);

		if (!group) {
			throw new NotFoundException('Group was not found');
		}

		return group;
	}

	async create(params: CreateParams): Promise<GroupDto> {
		return this.groupRepository.create(params);
	}

	async update(params: UpdateParams): Promise<GroupDto> {
		return this.groupRepository.update(params);
	}

	async remove(params: RemoveParams): Promise<boolean> {
		await this.groupRepository.remove(params);

		return true;
	}
}
