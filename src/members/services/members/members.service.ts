import {
	ConflictException,
	Injectable,
	NotFoundException
} from '@nestjs/common';
import { SecurityUserDto } from '@/users';
import { MailService } from '@/mail';
import { MembersTokensService } from '../members-tokens';
import { MembersRepository } from '../../repositories';
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
export class MembersService {
	constructor(
		private readonly membersRepository: MembersRepository,
		private readonly membersService: MembersTokensService,
		private readonly mailService: MailService
	) {}

	async getUsers(params: GetUsersParams): Promise<SecurityUserDto[]> {
		const users = await this.membersRepository.getUsers(params);

		if (!users) {
			throw new NotFoundException('Room was not found');
		}

		return users;
	}

	async getInvitations(
		params: GetInvitationsParams
	): Promise<SecurityUserDto[]> {
		const users = await this.membersRepository.getInvitations(params);

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

		const isInvited = await this.membersRepository.isInvited(params);

		if (isInvited) {
			throw new ConflictException('User has already been invited into room');
		}

		const user = await this.membersRepository.addInvitation(params);

		const token = await this.membersService.generateInviteToken({
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

		const { roomId, } = await this.membersService.verifyToken(token);

		const user = await this.membersRepository.addUser({ userId, roomId, });

		if (!user) {
			throw new ConflictException('User already exists in this room');
		}

		return user;
	}

	async approveInvite(params: ApproveInviteParams): Promise<SecurityUserDto> {
		const isInvited = await this.membersRepository.isInvited(params as any);

		if (!isInvited) {
			throw new ConflictException('User already exists');
		}

		return this.membersRepository.activateUser(params as any);
	}

	async rejectInvite(params: RejectInviteParams): Promise<boolean> {
		return this.membersRepository.removeUserHard(params as any);
	}

	async removeUser(params: RemoveUserParams): Promise<boolean> {
		const isSuccess = await this.membersRepository.removeUser(params);

		if (!isSuccess) {
			throw new ConflictException("Room doesn't already exist this user");
		}

		return isSuccess;
	}

	async isExists(params: IsExistsParams): Promise<boolean> {
		return this.membersRepository.existsUser(params);
	}
}
