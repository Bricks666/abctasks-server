import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@/database';
import { GroupDto } from '../../dto';
import {
	CreateParams,
	GetAllParams,
	GetOneParams,
	RemoveParams,
	UpdateParams
} from './types';

@Injectable()
export class GroupRepository {
	constructor(private readonly databaseService: DatabaseService) {}

	async getAll(params: GetAllParams): Promise<GroupDto[]> {
		return this.databaseService.group.findMany({
			where: params,
		}) as Promise<GroupDto[]>;
	}

	async getOne(params: GetOneParams): Promise<GroupDto | null> {
		return this.databaseService.group.findUnique({
			where: {
				id_roomId: params,
			},
		}) as Promise<GroupDto | null>;
	}

	async create(params: CreateParams): Promise<GroupDto> {
		return this.databaseService.group.create({
			data: params,
		}) as Promise<GroupDto>;
	}

	async update(params: UpdateParams): Promise<GroupDto> {
		const { id, roomId, ...data } = params;

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

	async remove(params: RemoveParams): Promise<void> {
		await this.databaseService.group.delete({
			where: {
				id_roomId: params,
			},
		});
	}
}
