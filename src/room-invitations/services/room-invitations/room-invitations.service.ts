import {
	BadRequestException,
	ConflictException,
	ForbiddenException,
	Injectable,
	InternalServerErrorException,
	NotFoundException
} from '@nestjs/common';
import { RoomInvitationDto } from '@/room-invitations/dto';
import { MailService } from '@/mail/services';
import { MembersService } from '@/members/services';
import { RoomInvitationsRepository } from '../../repositories';
import {
	RoomInvitation,
	RoomInvitationsTokensService
} from '../room-invitations-tokens';
import {
	GetInvitationsParams,
	GetInvitationParams,
	GenerateInvitationLinkParams,
	CreatePersonalInvitation,
	AnswerInvitationParams,
	RemoveInvitationParams
} from './types';
import { isPersonalInvitation } from './lib';

@Injectable()
export class RoomInvitationsService {
	constructor(
		private readonly roomInvitationsRepository: RoomInvitationsRepository,
		private readonly roomInvitationsTokensService: RoomInvitationsTokensService,
		private readonly membersService: MembersService,
		private readonly mailService: MailService
	) {}

	async getRoomInvitations(
		params: GetInvitationsParams
	): Promise<RoomInvitationDto[]> {
		const invitations = await this.roomInvitationsRepository.getAllActive(
			params
		);

		if (!invitations) {
			throw new NotFoundException('Room was not found');
		}

		return invitations;
	}

	async getOneViaToken(
		params: GetInvitationParams
	): Promise<RoomInvitationDto> {
		const { token, userId, } = params;

		const roomInvitation = await this.roomInvitationsTokensService.verifyToken(
			token
		);

		this.validateInvitation(roomInvitation, userId);

		const invitation = await this.roomInvitationsRepository.getOne({
			userId,
			roomId: roomInvitation.roomId,
		});

		if (!invitation) {
			throw new NotFoundException('Invitation was not found');
		}

		return invitation;
	}

	async generateInvitationLink(
		params: GenerateInvitationLinkParams
	): Promise<string> {
		const { roomId, userId, } = params;

		let token: string;

		if (typeof userId === 'undefined') {
			token = await this.roomInvitationsTokensService.generateInvitationToken({
				roomId,
			});
		} else {
			token =
				await this.roomInvitationsTokensService.generatePersonalInvitationToken(
					{
						roomId,
						userId,
					}
				);
		}

		return `${process.env.CLIENT_APP_HOST}/rooms/invite?token=${token}`;
	}

	async createPersonalInvitation(
		params: CreatePersonalInvitation
	): Promise<RoomInvitationDto> {
		const { roomId, userId, inviterId, } = params;

		const isExists = await this.membersService.isExists({
			roomId,
			userId,
		});

		if (isExists) {
			throw new ConflictException('User already exists in room');
		}

		const isInvited = await this.roomInvitationsRepository.getOne({
			roomId,
			userId,
		});

		if (isInvited) {
			throw new ConflictException('User has already been invited into room');
		}

		const invitation = await this.roomInvitationsRepository.create({
			roomId,
			userId,
			inviterId,
		});

		const url = await this.generateInvitationLink({
			roomId,
			userId,
		});

		await this.mailService.sendRoomInviteConfirmation({
			url,
			email: invitation.user.email,
			name: invitation.user.username,
		});

		return invitation;
	}

	async approve(params: AnswerInvitationParams): Promise<boolean> {
		const { token, userId, } = params;

		const tokenPayload = await this.roomInvitationsTokensService.verifyToken(
			token
		);

		const roomInvitation = this.validateInvitation(tokenPayload, userId);

		const invitation = await this.roomInvitationsRepository.getOne({
			userId,
			roomId: roomInvitation.roomId,
		});

		const isInvited = invitation.status === 'sended';

		if (!isInvited) {
			throw new ConflictException('User has not been invited');
		}

		const approved = await this.roomInvitationsRepository.approve({
			id: invitation.id,
		});

		if (!approved) {
			throw new InternalServerErrorException('Something went wrong');
		}

		await this.membersService.addMember({
			userId,
			roomId: invitation.room.id,
		});

		return true;
	}

	async reject(params: AnswerInvitationParams): Promise<boolean> {
		const { token, userId, } = params;

		const tokenPayload = await this.roomInvitationsTokensService.verifyToken(
			token
		);

		const roomInvitation = this.validateInvitation(tokenPayload, userId);

		const invitation = await this.roomInvitationsRepository.getOne({
			userId,
			roomId: roomInvitation.roomId,
		});

		const isInvited = invitation.status === 'sended';

		if (!isInvited) {
			throw new ConflictException('User has not been invited');
		}

		return this.roomInvitationsRepository.reject({
			id: invitation.id,
		});
	}

	async remove(params: RemoveInvitationParams): Promise<boolean> {
		const removed = await this.roomInvitationsRepository.remove({
			id: params.id,
		});

		if (!removed) {
			throw new BadRequestException('Invitation is not exist');
		}

		return removed;
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
