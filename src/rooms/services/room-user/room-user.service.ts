import {
	ConflictException,
	Injectable,
	NotFoundException
} from '@nestjs/common';
import { SecurityUserDto } from '@/users';
import { MailService } from '@/mail';
import { RoomUserRepository } from '../../repositories';
import { RoomTokensService } from '../room-tokens';
import {
	GetUsersParams,
	InviteUserParams,
	ApproveInviteParams,
	RejectInviteParams,
	RemoveUserParams,
	IsExistsParams,
	GetInvitationsParams,
	AddUserViaLinkParams
} from './types';

@Injectable()
export class RoomUserService {
	constructor(
		private readonly roomUserRepository: RoomUserRepository,
		private readonly roomTokensService: RoomTokensService,
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

		const token = await this.roomTokensService.generateInviteToken({
			roomId: params.roomId,
			userId: user.id,
		});

		await this.mailService.sendRoomInviteConfirmation({
			token,
			email: user.email,
			name: user.username,
		});

		return user;
	}

	async addUserViaLink(params: AddUserViaLinkParams): Promise<SecurityUserDto> {
		const { token, userId, } = params;

		const { roomId, } = await this.roomTokensService.verifyLinkToken(token);

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
