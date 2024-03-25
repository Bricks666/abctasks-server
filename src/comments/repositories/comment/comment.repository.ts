import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaDatabaseService } from '@bricks-ether/server-utils/nestjs';
import { SECURITY_USER_SELECT } from '@/users/repositories';
import { CommentDto } from '../../dto';
import {
	CreateParams,
	GetAllParams,
	getOneParams,
	RemoveParams,
	UpdateParams
} from './types';

const select = {
	id: true,
	roomId: true,
	taskId: true,
	author: {
		select: {
			user: {
				select: SECURITY_USER_SELECT,
			},
		},
	},
	content: true,
	updatedAt: true,
	createdAt: true,
} satisfies Prisma.CommentSelect;

@Injectable()
export class CommentRepository {
	constructor(private readonly databaseService: PrismaDatabaseService) {}

	async getAll(params: GetAllParams): Promise<CommentDto[]> {
		const { limit, offset, roomId, taskId, } = params;

		const comments = await this.databaseService.comment.findMany({
			select,
			where: {
				roomId,
				taskId,
			},
			take: limit,
			skip: offset,
		});

		return comments.map(CommentRepository.map);
	}

	async getOne(params: getOneParams): Promise<CommentDto | null> {
		const comment = await this.databaseService.comment.findFirst({
			where: params,
			select,
		});

		return comment ? CommentRepository.map(comment) : null;
	}

	async create(params: CreateParams): Promise<CommentDto> {
		const comment = await this.databaseService.comment.create({
			data: params,
			select,
		});

		return CommentRepository.map(comment);
	}

	async update(params: UpdateParams): Promise<CommentDto> {
		const { id, roomId, taskId, ...data } = params;

		const comment = await this.databaseService.comment.update({
			data,
			where: {
				id_roomId_taskId: {
					id,
					roomId,
					taskId,
				},
			},
			select,
		});

		return CommentRepository.map(comment);
	}

	async remove(params: RemoveParams): Promise<void> {
		await this.databaseService.comment.delete({
			where: {
				id_roomId_taskId: params,
			},
		});
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	private static map(comment: any): CommentDto {
		const { author, ...rest } = comment;

		return {
			...rest,
			author: author.user,
		};
	}
}
