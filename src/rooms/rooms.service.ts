import {
	ConflictException,
	Injectable,
	NotFoundException
} from '@nestjs/common';
import { SecurityUserDto } from '@/users/dto';
import { normalizePaginationParams } from '@/utils';
import { RoomDto } from './dto';
import { RoomRepository, RoomUserRepository } from './repository';
import { UserRepository } from '@/users/repository';
import { ServiceParams } from '@/common';
import {
	AddUserData,
	CreateData,
	GetAllData,
	GetOneData,
	GetUsersData,
	RemoveData,
	RemoveUserData,
	RoomExistsUserData,
	UpdateData
} from './types';

@Injectable()
export class RoomsService {
	constructor(
		private readonly roomsRepository: RoomRepository,
		private readonly roomUserRepository: RoomUserRepository,
		private readonly usersRepository: UserRepository
	) {}

	async getAll(params: ServiceParams<GetAllData>): Promise<RoomDto[]> {
		const { data, } = params;
		const pagination = normalizePaginationParams({});

		return this.roomsRepository.getAllByUser({
			filters: data,
			pagination,
		});
	}

	async getOne(params: ServiceParams<GetOneData>): Promise<RoomDto> {
		const { data, } = params;
		const room = await this.roomsRepository.getOne({ filters: data, });

		if (!room) {
			throw new NotFoundException('Room was not found');
		}

		return room;
	}

	async create(params: ServiceParams<CreateData>): Promise<RoomDto> {
		const {
			data: { userId, ...dto },
		} = params;
		return this.roomsRepository.create({
			data: { ...dto, userId, },
			filters: { userId, },
		});
	}

	async update(params: ServiceParams<UpdateData>): Promise<RoomDto> {
		const {
			data: { id, userId, ...dto },
		} = params;
		return this.roomsRepository.update({
			data: dto,
			filters: {
				userId,
				id,
			},
		});
	}

	async getUsers(
		params: ServiceParams<GetUsersData>
	): Promise<SecurityUserDto[]> {
		const {
			data: { id, },
		} = params;
		const users = await this.roomUserRepository.getUsers({
			filters: { roomId: id, },
		});

		if (!users) {
			throw new NotFoundException('Room was not found');
		}

		return users;
	}

	async addUser(params: ServiceParams<AddUserData>): Promise<SecurityUserDto> {
		const {
			data: { id, userId, },
		} = params;
		const added = await this.roomUserRepository.addUser({
			data: { roomId: id, userId, },
		});

		if (!added) {
			throw new ConflictException('User already exists');
		}

		return this.usersRepository.getOne(userId);
	}

	async removeUser(params: ServiceParams<RemoveUserData>): Promise<boolean> {
		const {
			data: { id, userId, },
		} = params;
		const isSuccess = await this.roomUserRepository.removeUser({
			data: {
				roomId: id,
				userId,
			},
		});

		if (!isSuccess) {
			throw new ConflictException("Room doesn't already exist this user");
		}

		return isSuccess;
	}

	async roomExistsUser(
		params: ServiceParams<RoomExistsUserData>
	): Promise<boolean> {
		const { data, } = params;
		return this.roomUserRepository.existsUser({
			filters: data,
		});
	}

	async remove(params: ServiceParams<RemoveData>): Promise<boolean> {
		const { data, } = params;
		return this.roomsRepository.remove({
			filters: data,
		});
	}
}
