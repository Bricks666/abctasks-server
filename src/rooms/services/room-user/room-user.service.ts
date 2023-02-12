import {
	ConflictException,
	Injectable,
	NotFoundException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SecurityUserDto } from '@/users';
import { RoomUserRepository, RoomRedisRepository } from '../../repositories';
import {
	GetUsersParams,
	InviteUserParams,
	GenerateInviteHashParams,
	ApproveInviteParams,
	RejectInviteParams,
	RemoveUserParams,
	IsExistsParams,
	GetInvitationsParams,
	AddUserParams
} from './types';

@Injectable()
export class RoomUserService {
	constructor(
		private readonly roomUserRepository: RoomUserRepository,
		private readonly roomRedisRepository: RoomRedisRepository,
		private readonly jwtService: JwtService
	) {}

	async getUsers(params: GetUsersParams): Promise<SecurityUserDto[]> {
		const users = await this.roomUserRepository.getUsers(params);

		if (!users) {
			throw new NotFoundException('Room was not found');
		}

		return users;
	}

	async getInvitations(
		params: GetInvitationsParams
	): Promise<SecurityUserDto[]> {
		const users = await this.roomUserRepository.getInvitations(params);

		if (!users) {
			throw new NotFoundException('Room was not found');
		}

		return users;
	}

	async inviteUser(params: InviteUserParams): Promise<SecurityUserDto> {
		const isExists = await this.isExists(params);

		if (isExists) {
			throw new ConflictException('User already exists in room');
		}

		const isInvited = await this.roomUserRepository.isInvited(params);

		if (isInvited) {
			throw new ConflictException('User has already been invited into room');
		}

		return this.roomUserRepository.addInvitation(params);
	}

	async generateInviteHash(params: GenerateInviteHashParams): Promise<string> {
		const cachedHash: string | null =
			await this.roomRedisRepository.getInviteHash(params);

		if (cachedHash) {
			return cachedHash;
		}

		const hash = await this.jwtService.signAsync(params, {
			secret: process.env.SECRET,
		});

		await this.roomRedisRepository.setInviteHash({ ...params, hash, });

		return hash;
	}

	async addUserByLink(params: AddUserParams): Promise<SecurityUserDto> {
		const { hash, userId, } = params;

		const { roomId, }: { roomId: number } = await this.jwtService.verifyAsync(
			hash,
			{
				secret: process.env.SECRET,
			}
		);

		const user = await this.roomUserRepository.addUser({ userId, roomId, });

		if (!user) {
			throw new ConflictException('User already exists in this room');
		}

		return user;
	}

	async approveInvite(params: ApproveInviteParams): Promise<SecurityUserDto> {
		const isInvited = await this.roomUserRepository.isInvited(params);

		if (!isInvited) {
			throw new ConflictException('User already exists');
		}

		return this.roomUserRepository.activateUser(params);
	}

	async rejectInvite(params: RejectInviteParams): Promise<boolean> {
		return this.roomUserRepository.removeUserHard(params);
	}

	async removeUser(params: RemoveUserParams): Promise<boolean> {
		const isSuccess = await this.roomUserRepository.removeUser(params);

		if (!isSuccess) {
			throw new ConflictException("Room doesn't already exist this user");
		}

		return isSuccess;
	}

	async isExists(params: IsExistsParams): Promise<boolean> {
		return this.roomUserRepository.existsUser(params);
	}
}
