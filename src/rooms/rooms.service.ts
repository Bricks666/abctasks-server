import {
	ConflictException,
	Injectable,
	NotFoundException
} from '@nestjs/common';
import { SecurityUserDto } from '@/users/dto';
import { normalizePaginationParams } from '@/utils';
import { CreateRoomDto, RoomDto, UpdateRoomDto } from './dto';
import { RoomRepository, RoomUserRepository } from './repository';
import { UserRepository } from '@/users/repository';

@Injectable()
export class RoomsService {
	constructor(
		private readonly roomsRepository: RoomRepository,
		private readonly roomUserRepository: RoomUserRepository,
		private readonly usersRepository: UserRepository
	) {}

	async getAll(userId: number): Promise<RoomDto[]> {
		const pagination = normalizePaginationParams({});

		return this.roomsRepository.getAllByUser(userId, pagination);
	}

	async getOne(id: number): Promise<RoomDto> {
		const room = await this.roomsRepository.getOne(id);

		if (!room) {
			throw new NotFoundException('Room was not found');
		}

		return room;
	}

	async create(userId: number, dto: CreateRoomDto): Promise<RoomDto> {
		return this.roomsRepository.create(dto, userId);
	}

	async update(id: number, dto: UpdateRoomDto): Promise<RoomDto> {
		return this.roomsRepository.update(id, dto);
	}

	async getUsers(id: number): Promise<SecurityUserDto[]> {
		const users = await this.roomsRepository.getUsers(id);

		if (!users) {
			throw new NotFoundException('Room was not found');
		}

		return users;
	}

	async addUser(id: number, userId: number): Promise<SecurityUserDto> {
		const added = await this.roomUserRepository.addUser(id, userId);

		if (!added) {
			throw new ConflictException('User already exists');
		}

		return this.usersRepository.getOne(userId);
	}

	async removeUser(id: number, userId: number): Promise<boolean> {
		const isSuccess = await this.roomUserRepository.removeUser(id, userId);

		if (!isSuccess) {
			throw new ConflictException("Room doesn't already exist this user");
		}

		return isSuccess;
	}

	async roomExistsUser(roomId: number, userId: number): Promise<boolean> {
		return this.roomUserRepository.existsUser(roomId, userId);
	}

	async remove(id: number): Promise<boolean> {
		return this.roomsRepository.remove(id);
	}
}
