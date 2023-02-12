import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@/database';
import { CommentDto } from '../../dto';
import {
	CreateParams,
	GetAllParams,
	getOneParams,
	RemoveParams,
	UpdateParams
} from './types';

@Injectable()
export class CommentRepository {
	constructor(private readonly databaseService: DatabaseService) {}

	async getAll(params: GetAllParams): Promise<CommentDto[]> {
		const { limit, offset, roomId, taskId, } = params;

		return this.databaseService.comment.findMany({
			where: {
				roomId,
				taskId,
			},
			take: limit,
			skip: offset,
		});
	}

	async getOne(params: getOneParams): Promise<CommentDto | null> {
		return this.databaseService.comment.findFirst({
			where: params,
		});
	}

	async create(params: CreateParams): Promise<CommentDto> {
		return this.databaseService.comment.create({
			data: params,
		});
	}

	async update(params: UpdateParams): Promise<CommentDto> {
		const { id, roomId, taskId, ...data } = params;

		return this.databaseService.comment.update({
			data,
			where: {
				id_roomId_taskId: {
					id,
					roomId,
					taskId,
				},
			},
		});
	}

	async remove(params: RemoveParams): Promise<void> {
		await this.databaseService.comment.delete({
			where: {
				id_roomId_taskId: params,
			},
		});
	}
}
