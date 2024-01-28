import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@/database/database.service';
import { RoomInvitationDto } from '../../dto';
import { invitationSelect } from '../configs';
import {
	AnswerRoomInvitationParams,
	CreateRoomInvitationParams,
	GetInvitationParams,
	GetMassRoomInvitationParams,
	GetPersonalRoomInvitationParams,
	GetRoomInvitationsParams,
	RemoveRoomInvitationParams
} from './types';

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
				status: 'sended',
				user: {
					isNot: null,
				},
			},
			select: invitationSelect,
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
			select: invitationSelect,
		});
	}

	async getPersonalInvitation(
		params: GetPersonalRoomInvitationParams
	): Promise<Required<RoomInvitationDto> | null> {
		const { roomId, userId, } = params;

		return this.databaseService.roomInvitation.findFirst({
			where: {
				roomId,
				userId,
				status: 'sended',
			},
			select: invitationSelect,
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
					status: 'sended',
				},
				select: invitationSelect,
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
			select: invitationSelect,
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
