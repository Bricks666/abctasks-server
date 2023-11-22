import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from '@/database';
import { SECURITY_USER_SELECT } from '@/users';
import { RoomInvitationDto } from '../../dto';
import {
	AnswerRoomInvitationParams,
	CreateRoomInvitationParams,
	GetRoomInvitationParams,
	GetRoomInvitationsParams,
	RemoveRoomInvitationParams
} from './types';

const select = {
	id: true,
	inviter: {
		select: SECURITY_USER_SELECT,
	},
	room: true,
	user: {
		select: SECURITY_USER_SELECT,
	},
	status: true,
} satisfies Prisma.RoomInvitationSelect;

@Injectable()
export class RoomInvitationsRepository {
	constructor(private readonly databaseService: DatabaseService) {}

	async getAllActive(
		params: GetRoomInvitationsParams
	): Promise<RoomInvitationDto[]> {
		const { roomId, } = params;

		return this.databaseService.roomInvitation.findMany({
			where: {
				roomId,
			},
			select,
		});
	}

	async getOne(
		params: GetRoomInvitationParams
	): Promise<RoomInvitationDto | null> {
		const { roomId, userId, inviterId, } = params;

		return this.databaseService.roomInvitation.findFirst({
			where: {
				roomId,
				userId,
				inviterId,
			},
			select,
		});
	}

	async create(params: CreateRoomInvitationParams): Promise<RoomInvitationDto> {
		const { inviterId, roomId, userId, } = params;

		return this.databaseService.roomInvitation.create({
			data: {
				roomId,
				userId,
				inviterId,
			},
			select,
		});
	}

	async approve(params: AnswerRoomInvitationParams): Promise<boolean> {
		return this.databaseService.roomInvitation
			.update({
				where: {
					id: params.id,
				},
				data: {
					status: 'approved',
				},
			})
			.then(() => true)
			.catch(() => false);
	}

	async reject(params: AnswerRoomInvitationParams): Promise<boolean> {
		return this.databaseService.roomInvitation
			.update({
				where: {
					id: params.id,
				},
				data: {
					status: 'rejected',
				},
			})
			.then(() => true)
			.catch(() => false);
	}

	async remove(params: RemoveRoomInvitationParams): Promise<boolean> {
		return this.databaseService.roomInvitation
			.delete({
				where: {
					id: params.id,
				},
			})
			.then(() => true)
			.catch(() => false);
	}
}
