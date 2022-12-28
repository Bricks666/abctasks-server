import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PaginationQueryDto } from '@/common';
import { CreateCommentDto, UpdateCommentDto } from './dto';
import { Comment } from './models';
import { normalizePaginationParams } from '@/utils';

@Injectable()
export class CommentsService {
	constructor(
		@InjectModel(Comment) private readonly commentsRepository: typeof Comment
	) {}

	async getAll(taskId: number, dto: PaginationQueryDto): Promise<Comment[]> {
		const { limit, offset, } = normalizePaginationParams(dto);
		return this.commentsRepository.findAll({
			where: {
				taskId,
			},
			limit,
			offset,
		});
	}

	async getOne(id: number, taskId: number): Promise<Comment> {
		const comment = await this.commentsRepository.findOne({
			where: {
				taskId,
				id,
			},
		});

		if (!comment) {
			throw new NotFoundException();
		}

		return comment;
	}

	async create(
		taskId: number,
		authorId: number,
		dto: CreateCommentDto
	): Promise<Comment> {
		return this.commentsRepository.create({ ...dto, authorId, taskId, });
	}

	async update(
		id: number,
		taskId: number,
		dto: UpdateCommentDto
	): Promise<Comment> {
		const comment = await this.getOne(id, taskId);
		return comment.update(dto);
	}

	async remove(id: number, taskId: number): Promise<boolean> {
		const comment = await this.getOne(id, taskId);
		await comment.destroy();
		return true;
	}
}
