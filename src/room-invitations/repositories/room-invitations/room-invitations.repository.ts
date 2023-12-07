import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from '@/database/database.service';
import { SECURITY_USER_SELECT } from '@/users/repositories';
import { RoomInvitationDto } from '../../dto';
import {
	AnswerRoomInvitationParams,
	CreateRoomInvitationParams,
	GetInvitationParams,
	GetMassRoomInvitationParams,
	GetPersonalRoomInvitationParams,
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

	async getInvitation(
		params: GetInvitationParams
	): Promise<RoomInvitationDto | null> {
		const { id, } = params;

		return this.databaseService.roomInvitation.findUnique({
			where: {
				id,
			},
			select,
		});
	}

	async getPersonalInvitation(
		params: GetPersonalRoomInvitationParams
	): Promise<RoomInvitationDto | null> {
		const { roomId, userId, } = params;

		return this.databaseService.roomInvitation.findFirst({
			where: {
				roomId,
				userId,
			},
			select,
		});
	}

	async getMassInvitation(
		params: GetMassRoomInvitationParams
	): Promise<RoomInvitationDto | null> {
		const { roomId, } = params;

		return this.databaseService.roomInvitation
			.findFirst({
				where: {
					roomId,
				},
				select,
			})
			.then((value) => value ?? null);
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
