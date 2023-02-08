import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@/database/database.service';
import { RoomDto } from '../dto';
import {
	CreateParams,
	GetAllByUserParams,
	GetOneParams,
	HasCanChange,
	RemoveParams,
	UpdateParams,
	WithCanChange
} from './types/room';

@Injectable()
export class RoomRepository {
	constructor(private readonly databaseService: DatabaseService) {}

	async getAllByUser(params: GetAllByUserParams): Promise<RoomDto[]> {
		const { limit, offset, userId, } = params;

		const rooms = await this.databaseService.room.findMany({
			skip: offset,
			take: limit,
			where: {
				room_user: {
					some: {
						userId,
						removed: false,
					},
				},
			},

			include: {
				room_user: {
					where: {
						userId,
					},
					select: {
						canChange: true,
					},
				},
			},
		});

		return rooms.map(this.#withCanChange);
	}

	async getOne(params: GetOneParams): Promise<RoomDto | null> {
		const { id, userId, } = params;
		const room = await this.databaseService.room.findFirst({
			where: {
				id,
			},
			include: {
				room_user: {
					where: {
						userId,
					},
					select: {
						canChange: true,
					},
				},
			},
		});

		return room ? this.#withCanChange(room) : null;
	}

	async create(params: CreateParams): Promise<RoomDto> {
		const { userId, ...rest } = params;

		const room = await this.databaseService.room.create({
			data: {
				...rest,
				creatorId: userId,
				room_user: {
					create: {
						userId,
					},
				},
			},
			include: {
				room_user: {
					where: {
						userId,
					},
					select: {
						canChange: true,
					},
				},
			},
		});

		return this.#withCanChange(room);
	}

	async update(params: UpdateParams): Promise<RoomDto> {
		const { id, userId, ...data } = params;

		const room = await this.databaseService.room.update({
			where: {
				id,
			},
			include: {
				room_user: {
					where: {
						userId,
					},
					select: {
						canChange: true,
					},
				},
			},
			data,
		});

		return this.#withCanChange(room);
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

	#withCanChange<T extends HasCanChange>(data: T): WithCanChange<T> {
		const { room_user, ...rest } = data;
		return { ...rest, ...room_user[0], };
	}
}
