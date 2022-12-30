import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@/database/database.service';
import { Pagination } from '@/utils';
import { CommentDto, CreateCommentDto, UpdateCommentDto } from '../dto';

@Injectable()
export class CommentRepository {
	constructor(private readonly databaseService: DatabaseService) {}

	async getAll(
		roomId: number,
		taskId: number,
		pagination: Pagination
	): Promise<CommentDto[]> {
		const { limit, offset, } = pagination;
		return this.databaseService.comment.findMany({
			where: {
				roomId,
				taskId,
			},
			take: limit,
			skip: offset,
		});
	}

	async getOne(
		roomId: number,
		taskId: number,
		id: number
	): Promise<CommentDto | null> {
		return this.databaseService.comment.findFirst({
			where: {
				id,
				taskId,
				roomId,
			},
		});
	}

	async create(
		taskId: number,
		roomId: number,
		authorId: number,
		data: CreateCommentDto
	): Promise<CommentDto> {
		return this.databaseService.comment.create({
			data: {
				...data,
				taskId,
				roomId,
				authorId,
			},
		});
	}

	async update(
		id: number,
		taskId: number,
		roomId: number,
		data: UpdateCommentDto
	): Promise<CommentDto> {
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

	async remove(id: number, taskId: number, roomId: number): Promise<void> {
		await this.databaseService.comment.delete({
			where: {
				id_roomId_taskId: {
					id,
					roomId,
					taskId,
				},
			},
		});
	}
}
