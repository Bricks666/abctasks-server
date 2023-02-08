import { Injectable, NotFoundException } from '@nestjs/common';
import { normalizePaginationParams } from '@/lib';
import { CommentDto } from './dto';
import { CommentRepository } from './repository';
import {
	CreateParams,
	GetAllParams,
	GetOneParams,
	RemoveParams,
	UpdateParams
} from './types';

@Injectable()
export class CommentsService {
	constructor(private readonly commentsRepository: CommentRepository) {}

	async getAll(params: GetAllParams): Promise<CommentDto[]> {
		const { roomId, taskId, count, page, } = params;

		const pagination = normalizePaginationParams({ count, page, });
		return this.commentsRepository.getAll({ roomId, taskId, ...pagination, });
	}

	async getOne(params: GetOneParams): Promise<CommentDto> {
		const comment = await this.commentsRepository.getOne(params);

		if (!comment) {
			throw new NotFoundException('Comment was not found');
		}

		return comment;
	}

	async create(params: CreateParams): Promise<CommentDto> {
		return this.commentsRepository.create(params);
	}

	async update(params: UpdateParams): Promise<CommentDto> {
		return this.commentsRepository.update(params);
	}

	async remove(params: RemoveParams): Promise<boolean> {
		await this.commentsRepository.remove(params);
		return true;
	}
}
