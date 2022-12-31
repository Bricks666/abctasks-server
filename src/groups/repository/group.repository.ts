import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@/database/database.service';
import { CreateGroupDto, GroupDto, UpdateGroupDto } from '../dto';

@Injectable()
export class GroupRepository {
	constructor(private readonly databaseService: DatabaseService) {}

	async getAll(roomId: number): Promise<GroupDto[]> {
		return this.databaseService.group.findMany({
			where: {
				roomId,
			},
		}) as Promise<GroupDto[]>;
	}

	async getOne(id: number, roomId: number): Promise<GroupDto | null> {
		return this.databaseService.group.findUnique({
			where: {
				id_roomId: {
					id,
					roomId,
				},
			},
		}) as Promise<GroupDto | null>;
	}

	async create(roomId: number, data: CreateGroupDto): Promise<GroupDto> {
		return this.databaseService.group.create({
			data: {
				...data,
				roomId,
			},
		}) as Promise<GroupDto>;
	}

	async update(
		id: number,
		roomId: number,
		data: UpdateGroupDto
	): Promise<GroupDto> {
		return this.databaseService.group.update({
			where: {
				id_roomId: {
					id,
					roomId,
				},
			},
			data,
		}) as Promise<GroupDto | null>;
	}

	async remove(id: number, roomId: number): Promise<void> {
		await this.databaseService.group.delete({
			where: {
				id_roomId: {
					id,
					roomId,
				},
			},
		});
	}
}
