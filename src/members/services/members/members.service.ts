import {
	ConflictException,
	ForbiddenException,
	Injectable,
	NotFoundException
} from '@nestjs/common';
import { SecurityUserDto } from '@/users';
import { MailService } from '@/mail';
import { MembersTokensService, RoomInvitation } from '../members-tokens';
import { MembersRepository } from '../../repositories';
import {
	GetUsersParams,
	InviteUserParams,
	RemoveUserParams,
	IsExistsParams,
	GetInvitedParams,
	AnswerInvitationParams
} from './types';
import { isPersonalInvitation } from './lib';

@Injectable()
export class MembersService {
	constructor(
		private readonly membersRepository: MembersRepository,
		private readonly membersTokensService: MembersTokensService,
		private readonly mailService: MailService
	) {}

	async getUsers(params: GetUsersParams): Promise<SecurityUserDto[]> {
		const users = await this.membersRepository.getMembers(params);

		if (!users) {
			throw new NotFoundException('Room was not found');
		}

		return users;
	}

	async getInvited(params: GetInvitedParams): Promise<SecurityUserDto[]> {
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

		const token =
			await this.membersTokensService.generatePersonalInvitationTOken({
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

	async approveInvitation(
		params: AnswerInvitationParams
	): Promise<SecurityUserDto> {
		const { token, userId, } = params;

		const tokenPayload = await this.membersTokensService.verifyToken(token);

		const invitation = this.validateInvitation(tokenPayload, userId);

		const isInvited = await this.membersRepository.isInvited({
			userId,
			roomId: invitation.roomId,
		});

		if (!isInvited) {
			throw new ConflictException('User already exists');
		}

		return this.membersRepository.activateMember({
			userId,
			roomId: invitation.roomId,
		});
	}

	async rejectInvitation(params: AnswerInvitationParams): Promise<boolean> {
		const { token, userId, } = params;

		const tokenPayload = await this.membersTokensService.verifyToken(token);

		const invitation = this.validateInvitation(tokenPayload, userId);

		const isInvited = await this.membersRepository.isInvited({
			userId,
			roomId: invitation.roomId,
		});

		if (isInvited) {
			throw new ConflictException('User has not been invited');
		}

		return this.membersRepository.removeMemberInvitation({
			userId,
			roomId: invitation.roomId,
		});
	}

	async removeUser(params: RemoveUserParams): Promise<boolean> {
		const isSuccess = await this.membersRepository.removeMember(params);

		if (!isSuccess) {
			throw new ConflictException("Room doesn't already exist this user");
		}

		return isSuccess;
	}

	async isExists(params: IsExistsParams): Promise<boolean> {
		return this.membersRepository.existsUser(params);
	}

	private validateInvitation(
		invitation: RoomInvitation,
		userId: number
	): RoomInvitation {
		const personalInvitation = isPersonalInvitation(invitation);

		if (!personalInvitation) {
			return invitation;
		}

		const sameUser = invitation.userId === userId;

		if (sameUser) {
			throw new ForbiddenException('This invitation is not yours');
		}

		return invitation;
	}
}
