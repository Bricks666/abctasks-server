import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '@/users/models';
import { CreateRoomDto, UpdateRoomDto } from './dto';
import { Room } from './models';

@Injectable()
export class RoomsService {
	constructor(
		@InjectModel(Room) private readonly roomsRepository: typeof Room
	) {}

	async getAll(userId: number): Promise<Room[]> {
		return this.roomsRepository.findAll({
			include: [
				{
					model: User,
					where: {
						id: userId,
					},
					attributes: [],
				},
			],
		});
	}

	async getOne(id: number): Promise<Room> {
		const room = await this.roomsRepository.findOne({
			where: {
				id,
			},
		});

		if (!room) {
			throw new NotFoundException();
		}

		return room;
	}

	async create(userId: number, dto: CreateRoomDto): Promise<Room> {
		const room = await this.roomsRepository.create(dto);
		room.$add('users', [userId]);

		return room;
	}

	async update(id: number, dto: UpdateRoomDto): Promise<Room> {
		await this.roomsRepository.update(dto, {
			where: {
				id,
			},
		});

		return this.getOne(id);
	}

	async remove(id: number): Promise<boolean> {
		await this.roomsRepository.destroy({
			where: {
				id,
			},
		});

		return true;
	}
}
