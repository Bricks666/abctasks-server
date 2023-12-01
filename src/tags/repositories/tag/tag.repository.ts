import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@/database/database.service';
import { TagDto } from '../../dto';
import {
	CreateParams,
	GetAllParams,
	GetOneParams,
	RemoveParams,
	UpdateParams
} from './types';

@Injectable()
export class TagRepository {
	constructor(private readonly databaseService: DatabaseService) {}

	async getAll(params: GetAllParams): Promise<TagDto[]> {
		return this.databaseService.tag.findMany({
			where: params,
		}) as Promise<TagDto[]>;
	}

	async getOne(params: GetOneParams): Promise<TagDto | null> {
		return this.databaseService.tag.findUnique({
			where: {
				id_roomId: params,
			},
		}) as Promise<TagDto | null>;
	}

	async create(params: CreateParams): Promise<TagDto> {
		return this.databaseService.tag.create({
			data: params,
		}) as Promise<TagDto>;
	}

	async update(params: UpdateParams): Promise<TagDto> {
		const { id, roomId, ...data } = params;

		return this.databaseService.tag.update({
			where: {
				id_roomId: {
					id,
					roomId,
				},
			},
			data,
		}) as Promise<TagDto | null>;
	}

	async remove(params: RemoveParams): Promise<void> {
		await this.databaseService.tag.delete({
			where: {
				id_roomId: params,
			},
		});
	}
}
