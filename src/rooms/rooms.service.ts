import {
	ConflictException,
	Injectable,
	NotFoundException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SecurityUserDto } from '@/users/dto';
import { normalizePaginationParams } from '@/lib';
import { UserRepository } from '@/users/repository';
import { RoomDto } from './dto';
import {
	ApproveInviteParams,
	CreateParams,
	GenerateInviteHashParams,
	GetAllParams,
	GetOneParams,
	GetUsersParams,
	IsOwnerParams,
	RemoveParams,
	RemoveUserParams,
	IsExistsParams,
	UpdateParams,
	InviteUserParams,
	RejectInviteParams
} from './types';
import {
	RoomRedisRepository,
	RoomRepository,
	RoomUserRepository
} from './repository';

@Injectable()
export class RoomsService {
	constructor(
		private readonly roomsRepository: RoomRepository,
		private readonly roomUserRepository: RoomUserRepository,
		private readonly usersRepository: UserRepository,
		private readonly roomRedisRepository: RoomRedisRepository,
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

	async remove(params: RemoveParams): Promise<boolean> {
		await this.roomRedisRepository.removeInviteHash({ roomId: params.id, });
		return this.roomsRepository.remove(params);
	}

	async getUsers(params: GetUsersParams): Promise<SecurityUserDto[]> {
		const { id, } = params;

		const users = await this.roomUserRepository.getUsers({ roomId: id, });

		if (!users) {
			throw new NotFoundException('Room was not found');
		}

		return users;
	}

	async inviteUser(params: InviteUserParams): Promise<SecurityUserDto> {
		const { id, userId, } = params;
		const isExists = await this.isExists({ roomId: id, userId, });

		if (isExists) {
			throw new ConflictException('User already exists in room');
		}

		const isInvited = await this.roomUserRepository.isInvited({
			roomId: id,
			userId,
		});

		if (isInvited) {
			throw new ConflictException('User has already been invited into room');
		}

		return this.roomUserRepository.addInvitation({
			roomId: id,
			userId,
		});
	}

	async generateInviteHash(params: GenerateInviteHashParams): Promise<string> {
		const { id, } = params;
		const cachedHash: string | null =
			await this.roomRedisRepository.getInviteHash({ roomId: id, });

		if (cachedHash) {
			return cachedHash;
		}

		const hash = await this.jwtService.signAsync(
			{ id, },
			{
				secret: process.env.SECRET,
			}
		);

		await this.roomRedisRepository.setInviteHash({ roomId: params.id, hash, });

		return hash;
	}

	async approveInvite(params: ApproveInviteParams): Promise<SecurityUserDto> {
		const { id, userId, } = params;

		const added = await this.roomUserRepository.addUser({
			roomId: id,
			userId,
		});

		if (!added) {
			throw new ConflictException('User already exists');
		}

		return this.usersRepository.getOne({ id: userId, });
	}

	async rejectInvite(params: RejectInviteParams): Promise<boolean> {
		const { id, userId, } = params;
		return this.roomUserRepository.removeUserHard({ roomId: id, userId, });
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

	async isOwner(params: IsOwnerParams): Promise<boolean> {
		const { roomId, userId, } = params;
		const room = await this.roomsRepository.getOne({
			id: roomId,
			userId,
		});

		if (!room) {
			throw new NotFoundException('Room was not found');
		}

		return room?.ownerId === userId;
	}

	async isExists(params: IsExistsParams): Promise<boolean> {
		return this.roomUserRepository.existsUser(params);
	}
}
