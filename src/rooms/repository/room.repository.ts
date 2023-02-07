import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@/database/database.service';
import { Pagination } from '@/utils';
import { CreateRoomDto, RoomDto, UpdateRoomDto } from '../dto';

@Injectable()
export class RoomRepository {
	constructor(private readonly databaseService: DatabaseService) {}

	async getAll(pagination: Pagination): Promise<RoomDto[]> {
		return this.databaseService.room.findMany({
			skip: pagination.offset,
			take: pagination.limit,
		});
	}

	async getAllByUser(
		userId: number,
		pagination: Pagination
	): Promise<RoomDto[]> {
		return this.databaseService.room.findMany({
			skip: pagination.offset,
			take: pagination.limit,
			where: {
				room_user: {
					some: {
						userId,
						removed: false,
					},
				},
			},
		});
	}

	async getOne(id: number): Promise<RoomDto | null> {
		return this.databaseService.room.findFirst({
			where: {
				id,
			},
		});
	}

	async create(data: CreateRoomDto, userId: number): Promise<RoomDto> {
		return this.databaseService.room.create({
			data: {
				...data,
				room_user: {
					create: {
						userId,
					},
				},
			},
		});
	}

	async update(id: number, data: UpdateRoomDto): Promise<RoomDto> {
		return this.databaseService.room.update({
			where: {
				id,
			},
			data,
		});
	}

	async remove(id: number): Promise<boolean> {
		await this.databaseService.room.delete({
			where: {
				id,
			},
		});

		return true;
	}
}
