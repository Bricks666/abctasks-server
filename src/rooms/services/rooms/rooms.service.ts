import { Injectable, NotFoundException } from '@nestjs/common';
import { WithRights } from '@/rooms/types';
import { normalizePaginationParams } from '@/shared';
import { RoomDto } from '../../dto';
import { RoomRepository } from '../../repositories';
import {
	CreateParams,
	GetAllParams,
	GetOneParams,
	IsOwnerParams,
	RemoveParams,
	UpdateParams
} from './types';

@Injectable()
export class RoomsService {
	constructor(private readonly roomsRepository: RoomRepository) {}

	async getAll(params: GetAllParams): Promise<WithRights<RoomDto>[]> {
		const { userId, } = params;
		const pagination = normalizePaginationParams({});

		const rooms = await this.roomsRepository.getAllByUser({
			...pagination,
			userId,
		});

		return rooms.map((room) => ({
			...room,
			canChange: room.ownerId === userId,
		}));
	}

	async getOne(params: GetOneParams): Promise<WithRights<RoomDto>> {
		const room = await this.roomsRepository.getOne(params);

		if (!room) {
			throw new NotFoundException('Room was not found');
		}

		return { ...room, canChange: room.ownerId === params.userId, };
	}

	async create(params: CreateParams): Promise<WithRights<RoomDto>> {
		const room = await this.roomsRepository.create(params);

		return { ...room, canChange: room.ownerId === params.userId, };
	}

	async update(params: UpdateParams): Promise<WithRights<RoomDto>> {
		const { userId, ...data } = params;
		const room = await this.roomsRepository.update(data);

		return { ...room, canChange: room.ownerId === userId, };
	}

	async isOwner(params: IsOwnerParams): Promise<boolean> {
		const room = await this.roomsRepository.getOne(params);

		if (!room) {
			throw new NotFoundException('Room was not found');
		}

		return room?.ownerId === params.userId;
	}

	async remove(params: RemoveParams): Promise<boolean> {
		return this.roomsRepository.remove(params);
	}
}
