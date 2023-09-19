import {
	ConflictException,
	Injectable,
	NotFoundException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SecurityUserDto } from '@/users';
import { MailService } from '@/mail';
import { RoomUserRepository } from '../../repositories';
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
		private readonly jwtService: JwtService,
		private readonly mailService: MailService
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

		const user = await this.roomUserRepository.addInvitation(params);

		await this.mailService.sendRoomInviteConfirmation({
			email: user.email,
			name: user.username,
			roomId: params.roomId,
		});

		return user;
	}

	async generateInviteHash(params: GenerateInviteHashParams): Promise<string> {
		return this.jwtService.signAsync(params, {
			secret: process.env.SECRET,
		});
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
