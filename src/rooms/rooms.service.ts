import {
	BadRequestException,
	Injectable,
	NotFoundException
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '@/users/models';
import { SecurityUserDto } from '@/users/dto';
import { CreateRoomDto, RoomUserDto, UpdateRoomDto } from './dto';
import { Room, RoomUser } from './models';

@Injectable()
export class RoomsService {
	constructor(
		@InjectModel(Room) private readonly roomsRepository: typeof Room,
		@InjectModel(RoomUser) private readonly roomUserRepository: typeof RoomUser,
		@InjectModel(User) private readonly usersRepository: typeof User
	) {}

	async getAll(userId: number): Promise<Room[]> {
		return this.roomsRepository.findAll({
			include: {
				model: User,
				where: {
					id: userId,
				},
				attributes: [],
				through: {
					attributes: [],
					where: {
						removed: false,
					},
				},
			},
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

	async getUsers(id: number): Promise<SecurityUserDto[]> {
		const room = await this.roomsRepository.findOne({
			where: {
				id,
			},
			attributes: [],
			include: [
				{
					model: User,
					attributes: { exclude: ['password'], },
					through: {
						attributes: [],
					},
				}
			],
		});

		if (!room) {
			throw new NotFoundException('Room was not found');
		}

		return room.users;
	}

	async addUser(id: number, dto: RoomUserDto): Promise<SecurityUserDto> {
		const pair = await this.roomUserRepository.findOne({
			where: {
				roomId: id,
				userId: dto.userId,
			},
		});
		if (pair) {
			if (!pair.removed) {
				throw new BadRequestException('User already exists');
			}
			await pair.update({
				removed: false,
			});
		} else {
			await this.roomUserRepository.create({ roomId: id, ...dto, });
		}

		return this.usersRepository.findByPk(dto.userId, {
			rejectOnEmpty: true,
		});
	}

	async removeUser(id: number, dto: RoomUserDto): Promise<boolean> {
		await this.roomUserRepository.update(
			{
				removed: true,
			},
			{
				where: {
					roomId: id,
					...dto,
				},
			}
		);
		return true;
	}

	async roomExistsUser(roomId: number, userId: number): Promise<boolean> {
		return this.roomUserRepository
			.findOne({
				where: { roomId, userId, removed: false, },
			})
			.then((res) => !!res);
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
