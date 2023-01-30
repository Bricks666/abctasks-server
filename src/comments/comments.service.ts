import { Injectable, NotFoundException } from '@nestjs/common';
import { PaginationQueryDto } from '@/common';
import { normalizePaginationParams } from '@/utils';
import { CommentDto, CreateCommentDto, UpdateCommentDto } from './dto';
import { CommentRepository } from './repository';

@Injectable()
export class CommentsService {
	constructor(private readonly commentsRepository: CommentRepository) {}

	async getAll(
		roomId: number,
		taskId: number,
		dto: PaginationQueryDto
	): Promise<CommentDto[]> {
		const pagination = normalizePaginationParams(dto);
		return this.commentsRepository.getAll(roomId, taskId, pagination);
	}

	async getOne(
		id: number,
		taskId: number,
		roomId: number
	): Promise<CommentDto> {
		const comment = await this.commentsRepository.getOne(id, taskId, roomId);

		if (!comment) {
			throw new NotFoundException('Comment was not found');
		}

		return comment;
	}

	async create(
		roomId: number,
		taskId: number,
		authorId: number,
		dto: CreateCommentDto
	): Promise<CommentDto> {
		return this.commentsRepository.create(taskId, roomId, authorId, dto);
	}

	async update(
		id: number,
		taskId: number,
		roomId: number,
		dto: UpdateCommentDto
	): Promise<CommentDto> {
		return this.commentsRepository.update(id, taskId, roomId, dto);
	}

	async remove(id: number, taskId: number, roomId: number): Promise<boolean> {
		await this.commentsRepository.remove(id, taskId, roomId);
		return true;
	}
}
