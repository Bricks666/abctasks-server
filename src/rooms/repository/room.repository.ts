import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@/database/database.service';
import { Pagination } from '@/utils';
import { RoomDto } from '../dto';
import { RepositoryParams, RepositoryParamsWithData } from '@/common';
import {
	CreateData,
	CreateFilters,
	GetAllByUserFilters,
	GetAllFilters,
	GetOneFilters,
	HasCanChange,
	RemoveFilters,
	UpdateData,
	UpdateFilters,
	WithCanChange
} from './types/room';

@Injectable()
export class RoomRepository {
	constructor(private readonly databaseService: DatabaseService) {}

	async getAll(
		params: RepositoryParams<GetAllFilters, never, Pagination>
	): Promise<RoomDto[]> {
		const { filters, pagination, } = params;
		const rooms = await this.databaseService.room.findMany({
			skip: pagination.offset,
			take: pagination.limit,
			include: {
				room_user: {
					where: filters,
					select: {
						canChange: true,
					},
				},
			},
		});

		return rooms.map(this.#withCanChange);
	}

	async getAllByUser(
		params: RepositoryParams<GetAllByUserFilters, undefined, Pagination>
	): Promise<RoomDto[]> {
		const { filters, pagination, } = params;

		const rooms = await this.databaseService.room.findMany({
			skip: pagination?.offset,
			take: pagination?.limit,
			where: {
				room_user: {
					some: {
						userId: filters.userId,
						removed: false,
					},
				},
			},

			include: {
				room_user: {
					where: {
						userId: filters.userId,
					},
					select: {
						canChange: true,
					},
				},
			},
		});

		return rooms.map(this.#withCanChange);
	}

	async getOne(
		params: RepositoryParams<GetOneFilters>
	): Promise<RoomDto | null> {
		const { filters, } = params;
		const room = await this.databaseService.room.findFirst({
			where: {
				id: filters.id,
			},
			include: {
				room_user: {
					where: {
						userId: filters.userId,
					},
					select: {
						canChange: true,
					},
				},
			},
		});

		return room ? this.#withCanChange(room) : null;
	}

	async create(
		params: RepositoryParamsWithData<CreateData, CreateFilters>
	): Promise<RoomDto> {
		const { filters, data, } = params;
		const { userId, ...rest } = data;

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
						userId: filters.userId,
					},
					select: {
						canChange: true,
					},
				},
			},
		});

		return this.#withCanChange(room);
	}

	async update(
		params: RepositoryParamsWithData<UpdateData, UpdateFilters>
	): Promise<RoomDto> {
		const { data, filters, } = params;
		const { id, userId, } = filters;

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

	async remove(params: RepositoryParams<RemoveFilters>): Promise<boolean> {
		const { filters, } = params;
		const { id, } = filters;

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
