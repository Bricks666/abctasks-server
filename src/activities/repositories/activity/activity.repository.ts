import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from '@/database';
import { ActivityDto } from '../../dto';
import {
	CreateParams,
	GetAllByRoomIdParams,
	GetAllByUserIdParams,
	GetTotalCountInRoomParams
} from './types';
import { prepareWhere } from './lib';

@Injectable()
export class ActivityRepository {
	constructor(private readonly databaseService: DatabaseService) {}

	async getAllByRoomId(params: GetAllByRoomIdParams): Promise<ActivityDto[]> {
		const {
			limit,
			offset,
			roomId,
			by = 'id',
			type = 'asc',
			...filters
		} = params;

		const where: Prisma.ActivityWhereInput = {
			...prepareWhere(filters),
			roomId,
		};

		return this.databaseService.activity.findMany({
			where,
			take: limit,
			skip: offset,
			include: {
				sphere: {
					select: {
						id: true,
						name: true,
					},
				},
			},
			orderBy: {
				[by]: type,
			},
		});
	}

	async getTotalCountInRoom(
		params: GetTotalCountInRoomParams
	): Promise<number> {
		/*
    TODO: Исправить дублирование кода, может вынести куда нибудь
    */
		const { roomId, ...filters } = params;

		const where: Prisma.ActivityWhereInput = {
			...prepareWhere(filters),
			roomId,
		};
		return this.databaseService.activity.count({
			where,
		});
	}

	async getAllByUserId(params: GetAllByUserIdParams): Promise<ActivityDto[]> {
		const { limit, offset, userId, } = params;
		return this.databaseService.activity.findMany({
			where: {
				activistId: userId,
			},
			take: limit,
			skip: offset,
			include: {
				sphere: {
					select: {
						id: true,
						name: true,
					},
				},
			},
		});
	}

	async create(params: CreateParams): Promise<ActivityDto> {
		const { actionName, sphereName, ...data } = params;
		return this.databaseService.activity.create({
			data: {
				...data,
				action: {
					connectOrCreate: {
						where: {
							name: actionName,
						},
						create: {
							name: actionName,
						},
					},
				},
				sphere: {
					connectOrCreate: {
						create: {
							name: sphereName,
						},
						where: {
							name: sphereName,
						},
					},
				},
			},
		});
	}
}
