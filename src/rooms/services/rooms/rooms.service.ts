import { Injectable, NotFoundException } from '@nestjs/common';
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

	async getAll(params: GetAllParams): Promise<RoomDto[]> {
		const { userId, } = params;
		const pagination = normalizePaginationParams({});

		return this.roomsRepository.getAllByUser({
			...pagination,
			userId,
		});
	}

	async getOne(params: GetOneParams): Promise<RoomDto> {
		const room = await this.roomsRepository.getOne(params);

		if (!room) {
			throw new NotFoundException('Room was not found');
		}

		return room;
	}

	async create(params: CreateParams): Promise<RoomDto> {
		return this.roomsRepository.create(params);
	}

	async update(params: UpdateParams): Promise<RoomDto> {
		return this.roomsRepository.update(params);
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
