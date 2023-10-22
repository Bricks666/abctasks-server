import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from '@/database';
import { SECURITY_USER_SELECT } from '@/users';
import { ActivityDto } from '../../dto';
import {
	CreateParams,
	GetAllByRoomIdParams,
	GetAllByUserIdParams,
	GetTotalCountInRoomParams
} from './types';
import { prepareWhere } from './lib';

const select = {
	id: true,
	roomId: true,
	room_user: {
		select: {
			user: {
				select: SECURITY_USER_SELECT,
			},
		},
	},
	sphere: true,
	action: true,
	createdAt: true,
} satisfies Prisma.ActivitySelect;

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

		return activities.map(ActivityRepository.map);
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
			include: {
				sphere: {
					select: {
						id: true,
						name: true,
					},
				},
			},
		});

		return activities.map(ActivityRepository.map);
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

		return ActivityRepository.map(activity);
	}

	private static map(activity: any): ActivityDto {
		const { room_user, ...rest } = activity;

		return {
			...rest,
			activist: room_user.user,
		};
	}
}
