import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGroupDto, GroupDto, UpdateGroupDto } from './dto';
import { GroupRepository } from './repository';

@Injectable()
export class GroupsService {
	constructor(private readonly groupRepository: GroupRepository) {}

	async getAll(roomId: number): Promise<GroupDto[]> {
		return this.groupRepository.getAll(roomId);
	}

	async getOne(roomId: number, id: number): Promise<GroupDto> {
		const group = await this.groupRepository.getOne(id, roomId);

		if (!group) {
			throw new NotFoundException('Group was not found');
		}

		return group;
	}

	async create(roomId: number, dto: CreateGroupDto): Promise<GroupDto> {
		return this.groupRepository.create(roomId, dto);
	}

	async update(
		roomId: number,
		id: number,
		dto: UpdateGroupDto
	): Promise<GroupDto> {
		return this.groupRepository.update(id, roomId, dto);
	}

	async remove(roomId: number, id: number): Promise<boolean> {
		await this.groupRepository.remove(id, roomId);

		return true;
	}
}
