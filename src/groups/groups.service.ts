import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateGroupDto, UpdateGroupDto } from './dto';
import { Group } from './models';

@Injectable()
export class GroupsService {
	constructor(
		@InjectModel(Group) private readonly groupRepository: typeof Group
	) {}

	async getGroups(roomId: number): Promise<Group[]> {
		return this.groupRepository.findAll({
			where: {
				roomId,
			},
		});
	}

	async getGroup(roomId: number, groupId: number): Promise<Group> {
		const group = await this.groupRepository.findOne({
			where: {
				roomId,
				groupId,
			},
		});

		if (!group) {
			throw new NotFoundException();
		}

		return group;
	}

	async createGroup(roomId: number, dto: CreateGroupDto): Promise<Group> {
		return this.groupRepository.create({
			roomId,
			...dto,
		});
	}

	async updateGroup(
		roomId: number,
		groupId: number,
		dto: UpdateGroupDto
	): Promise<Group> {
		await this.groupRepository.update(dto, {
			where: {
				roomId,
				groupId,
			},
		});

		return this.getGroup(roomId, groupId);
	}

	async deleteGroup(roomId: number, groupId: number): Promise<boolean> {
		const a = await this.groupRepository.destroy({
			where: {
				roomId,
				groupId,
			},
			cascade: true,
		});

		return !!a;
	}
}
