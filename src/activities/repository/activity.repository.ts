import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from '@/database/database.service';
import { ActivityDto, CreateActivityDto, GetActivitiesQueryDto } from '../dto';
import { Pagination } from '@/utils';
import { PaginationQueryDto } from '@/common';

@Injectable()
export class ActivityRepository {
	constructor(private readonly databaseService: DatabaseService) {}

	async getAllByRoomId(
		roomId: number,
		filters: Omit<GetActivitiesQueryDto, keyof PaginationQueryDto>,
		pagination: Pagination
	): Promise<ActivityDto[]> {
		const { limit, offset, } = pagination;

		const where: Prisma.activityWhereInput = {
			roomId,
			action: filters.action,
			activistId: filters.activistId,
			createdAt: {
				gte: filters.after,
				lte: filters.before,
			},
			sphere: {
				name: filters.sphereName,
			},
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
				id: 'desc',
			},
		});
	}

	async getTotalCountInRoom(
		roomId: number,
		filters: Omit<GetActivitiesQueryDto, keyof PaginationQueryDto>
	): Promise<number> {
		/*
    TODO: Исправить дублирование кода, может вынести куда нибудь
    */
		const where: Prisma.activityWhereInput = {
			roomId,
			action: filters.action,
			activistId: filters.activistId,
			createdAt: {
				gte: filters.after,
				lte: filters.before,
			},
			sphere: {
				name: filters.sphereName,
			},
		};
		return this.databaseService.activity.count({
			where,
		});
	}

	async getAllByUserId(
		userId: number,
		pagination: Pagination
	): Promise<ActivityDto[]> {
		const { limit, offset, } = pagination;
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

	async create(roomId: number, dto: CreateActivityDto): Promise<ActivityDto> {
		return this.databaseService.activity.create({
			data: {
				action: dto.action,
				activistId: dto.activistId,
				roomId,
				sphere: {
					connectOrCreate: {
						create: {
							name: dto.sphereName,
						},
						where: {
							name: dto.sphereName,
						},
					},
				},
			},
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
}
