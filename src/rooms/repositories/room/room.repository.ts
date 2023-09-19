import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@/database';
import { RoomDto } from '../../dto';
import {
	CreateParams,
	GetAllByUserParams,
	GetOneParams,
	RemoveParams,
	UpdateParams
} from './types';

@Injectable()
export class RoomRepository {
	constructor(private readonly databaseService: DatabaseService) {}

	async getAllByUser(params: GetAllByUserParams): Promise<RoomDto[]> {
		const { limit, offset, userId, } = params;

		return this.databaseService.room.findMany({
			skip: offset,
			take: limit,
			where: {
				room_user: {
					some: {
						userId,
						removed: false,
						activated: true,
					},
				},
			},
		});
	}

	async getOne(params: GetOneParams): Promise<RoomDto | null> {
		const { id, } = params;
		return this.databaseService.room.findFirst({
			where: {
				id,
			},
		});
	}

	async create(params: CreateParams): Promise<RoomDto> {
		const { userId, ...rest } = params;

		return this.databaseService.room.create({
			data: {
				...rest,
				ownerId: userId,
				room_user: {
					create: {
						userId,
						activated: true,
					},
				},
			},
		});
	}

	async update(params: UpdateParams): Promise<RoomDto> {
		const { id, ...data } = params;

		return this.databaseService.room.update({
			where: {
				id,
			},
			data,
		});
	}

	async remove(params: RemoveParams) {
		const { id, } = params;

		await this.databaseService.room.delete({
			where: {
				id,
			},
		});

		return true;
	}
}
