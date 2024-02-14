import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from '@/database/database.service';
import { ActivityDto } from '../../dto';
import {
	CreateParams,
	GetAllByRoomIdParams,
	GetAllByUserIdParams,
	GetTotalCountInRoomParams
} from './types';
import { convertActivityRecordToActivityDto, prepareWhere } from './lib';
import { select } from './config';

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

		const activities = await this.databaseService.activity.findMany({
			where,
			select,
			take: limit,
			skip: offset,
			orderBy: {
				[by]: type,
			},
		});

		return activities.map(convertActivityRecordToActivityDto);
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
		const activities = await this.databaseService.activity.findMany({
			where: {
				activistId: userId,
			},
			take: limit,
			skip: offset,
			select,
		});

		return activities.map(convertActivityRecordToActivityDto);
	}

	async create(params: CreateParams): Promise<ActivityDto> {
		const { actionName, sphereName, ...data } = params;
		const activity = await this.databaseService.activity.create({
			data: {
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
				room_user: {
					connect: {
						roomId_userId: {
							roomId: data.roomId,
							userId: data.activistId,
						},
					},
				},
			},
			select,
		});

		return convertActivityRecordToActivityDto(activity);
	}
}
