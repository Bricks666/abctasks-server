import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateGroupDto, UpdateGroupDto } from './dto';
import { Group } from './models';

@Injectable()
export class GroupsService {
	constructor(
		@InjectModel(Group) private readonly groupRepository: typeof Group
	) {}

	async getAll(roomId: number): Promise<Group[]> {
		return this.groupRepository.findAll({
			where: {
				roomId,
			},
		});
	}

	async getOne(roomId: number, id: number): Promise<Group> {
		const group = await this.groupRepository.findOne({
			where: {
				roomId,
				id,
			},
		});

		if (!group) {
			throw new NotFoundException();
		}

		return group;
	}

	async create(roomId: number, dto: CreateGroupDto): Promise<Group> {
		return this.groupRepository.create({
			roomId,
			...dto,
		});
	}

	async update(
		roomId: number,
		id: number,
		dto: UpdateGroupDto
	): Promise<Group> {
		const group = await this.getOne(roomId, id);
		return group.update(dto);
	}

	async remove(roomId: number, id: number): Promise<boolean> {
		const a = await this.groupRepository.destroy({
			where: {
				roomId,
				id,
			},
		});

		return !!a;
	}
}
