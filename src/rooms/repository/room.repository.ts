import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@/database/database.service';
import { SecurityUserDto } from '@/users/dto';
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

	async getUsers(id: number): Promise<SecurityUserDto[] | null> {
		const room = await this.databaseService.room.findUnique({
			where: {
				id,
			},
			include: {
				room_user: {
					include: {
						user: {
							select: {
								id: true,
								login: true,
								photo: true,
							},
						},
					},
				},
			},
		});

		return room.room_user.map((u) => u.user);
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
