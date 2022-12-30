import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@/database/database.service';
import { ActivityDto, CreateActivityDto } from '../dto';
import { Pagination } from '@/utils';

@Injectable()
export class ActivityRepository {
	constructor(private readonly databaseService: DatabaseService) {}

	async getAllByRoomId(
		roomId: number,
		pagination: Pagination
	): Promise<ActivityDto[]> {
		const { limit, offset, } = pagination;
		return this.databaseService.activity.findMany({
			where: {
				roomId,
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
							name: dto.action,
						},
						where: {
							name: dto.action,
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
