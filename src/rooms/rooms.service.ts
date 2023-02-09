import {
	ConflictException,
	Injectable,
	NotFoundException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SecurityUserDto } from '@/users/dto';
import { normalizePaginationParams } from '@/lib';
import { RoomDto } from './dto';
import { RoomRepository, RoomUserRepository } from './repository';
import { UserRepository } from '@/users/repository';
import {
	AddUserParams,
	CreateParams,
	GenerateAddUserLink,
	GetAllParams,
	GetOneParams,
	GetUsersParams,
	RemoveParams,
	RemoveUserParams,
	RoomExistsUserParams,
	UpdateParams
} from './types';
import { RedisService } from '@/redis';
import { getLinkRedisKey } from './config';

@Injectable()
export class RoomsService {
	constructor(
		private readonly roomsRepository: RoomRepository,
		private readonly roomUserRepository: RoomUserRepository,
		private readonly usersRepository: UserRepository,
		private readonly redisService: RedisService,
		private readonly jwtService: JwtService
	) {}

	async getAll(params: GetAllParams): Promise<RoomDto[]> {
		const { userId, } = params;
		const pagination = normalizePaginationParams({});

		return this.roomsRepository.getAllByUser({
			...pagination,
			userId,
		});
	}

	async getOne(params: GetOneParams): Promise<RoomDto> {
		const room = await this.roomsRepository.getOne(params);

		if (!room) {
			throw new NotFoundException('Room was not found');
		}

		return room;
	}

	async create(params: CreateParams): Promise<RoomDto> {
		return this.roomsRepository.create(params);
	}

	async update(params: UpdateParams): Promise<RoomDto> {
		return this.roomsRepository.update(params);
	}

	async getUsers(params: GetUsersParams): Promise<SecurityUserDto[]> {
		const { id, } = params;

		const users = await this.roomUserRepository.getUsers({ roomId: id, });

		if (!users) {
			throw new NotFoundException('Room was not found');
		}

		return users;
	}

	async addUser(params: AddUserParams): Promise<SecurityUserDto> {
		const { id, userId, } = params;
		const added = await this.roomUserRepository.addUser({
			roomId: id,
			userId,
		});

		if (!added) {
			throw new ConflictException('User already exists');
		}

		return this.usersRepository.getOne({ id, });
	}

	async generateAddUserLink(params: GenerateAddUserLink): Promise<string> {
		const { id, } = params;
		const generatedLink: string | null = await this.redisService.get(
			getLinkRedisKey(id)
		);

		if (generatedLink) {
			return generatedLink;
		}

		const hash = await this.jwtService.signAsync(
			{ id, },
			{
				secret: process.env.SECRET,
			}
		);

		await this.redisService.set(getLinkRedisKey(id), hash);

		return hash;
	}

	async removeUser(params: RemoveUserParams): Promise<boolean> {
		const { id, userId, } = params;
		const isSuccess = await this.roomUserRepository.removeUser({
			roomId: id,
			userId,
		});

		if (!isSuccess) {
			throw new ConflictException("Room doesn't already exist this user");
		}

		return isSuccess;
	}

	async roomExistsUser(params: RoomExistsUserParams): Promise<boolean> {
		return this.roomUserRepository.existsUser(params);
	}

	async remove(params: RemoveParams): Promise<boolean> {
		await this.redisService.del(getLinkRedisKey(params.id));
		return this.roomsRepository.remove(params);
	}
}
