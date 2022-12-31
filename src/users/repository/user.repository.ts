import { Injectable } from '@nestjs/common';
import { Prisma, user as UserModel } from '@prisma/client';
import { DatabaseService } from '@/database/database.service';
import { PaginationQueryDto } from '@/common';
import {
	CreateUserDto,
	GetUsersQueryDto,
	SecurityUserDto,
	UpdateUserDto
} from '../dto';

@Injectable()
export class UserRepository {
	constructor(private readonly databaseService: DatabaseService) {}

	async getAll(
		dto: Omit<GetUsersQueryDto, keyof PaginationQueryDto>,
		limit: number,
		offset: number
	): Promise<SecurityUserDto[]> {
		const where: Prisma.userWhereInput = {};

		if (typeof dto.login !== 'undefined') {
			where.login = {
				startsWith: dto.login,
			};
		}

		if (typeof dto.roomId !== 'undefined') {
			where.room_user.some.AND = {
				roomId: dto.roomId,
				removed: false,
			};
		}

		return this.databaseService.user.findMany({
			where,
			skip: offset,
			take: limit,
			select: {
				id: true,
				login: true,
				photo: true,
			},
		});
	}

	async getOne(id: number): Promise<SecurityUserDto | null> {
		return this.databaseService.user.findFirst({
			where: {
				id,
			},
		});
	}

	async getOneByLogin(login: string): Promise<UserModel | null> {
		return this.databaseService.user.findFirst({
			where: {
				login,
			},
		});
	}

	async create(data: CreateUserDto): Promise<SecurityUserDto> {
		return this.databaseService.user.create({
			data,
			select: {
				id: true,
				login: true,
				photo: true,
			},
		});
	}

	async update(id: number, data: UpdateUserDto): Promise<SecurityUserDto> {
		return this.databaseService.user.update({
			data,
			where: {
				id,
			},
		});
	}
}
