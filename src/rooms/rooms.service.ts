import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '@/users/models';
import { CreateRoomDto, UpdateRoomDto } from './dto';
import { Room } from './models';

@Injectable()
export class RoomsService {
	constructor(@InjectModel(Room) private readonly roomsRepository: typeof Room) {}

	async getRooms(userId: number): Promise<Room[]> {
		return this.roomsRepository.findAll({
			include: [
				{
					model: User,
					where: {
						userId,
					},
					attributes: [],
				},
			],
		});
	}

	async getRoom(roomId: number): Promise<Room> {
		const room = await this.roomsRepository.findOne({
			where: {
				roomId,
			},
		});

		if (!room) {
			throw new NotFoundException();
		}

		return room;
	}

	async createRoom(userId: number, dto: CreateRoomDto): Promise<Room> {
		const room = await this.roomsRepository.create(dto);
		room.$add('users', [userId]);

		return room;
	}

	async updateRoom(roomId: number, dto: UpdateRoomDto): Promise<Room> {
		await this.roomsRepository.update(dto, {
			where: {
				roomId,
			},
		});

		return this.getRoom(roomId);
	}

	async deleteRoom(roomId: number): Promise<void> {
		await this.roomsRepository.destroy({
			where: {
				roomId,
			},
		});
	}
}
