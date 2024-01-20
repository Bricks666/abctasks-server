import { Injectable } from '@nestjs/common';
import { Prisma, User as UserModel } from '@prisma/client';
import { DatabaseService } from '@/database/database.service';
import { SecurityUserDto } from '../../dto';
import { SECURITY_USER_SELECT } from './config';
import {
	ActivateParams,
	CreateData,
	GetAllParams,
	GetOneByEmailParams,
	GetOneParams,
	IsActivatedParams,
	UpdateParams
} from './types';

@Injectable()
export class UserRepository {
	constructor(private readonly databaseService: DatabaseService) {}

	async getAll(params: GetAllParams): Promise<SecurityUserDto[]> {
		const { username, limit, offset, } = params;
		const where: Prisma.UserWhereInput = {};

		if (typeof username !== 'undefined') {
			where.username = {
				startsWith: username,
			};
		}

		return this.databaseService.user.findMany({
			where,
			skip: offset,
			take: limit,
			select: SECURITY_USER_SELECT,
		});
	}

	async getOne(params: GetOneParams): Promise<SecurityUserDto | null> {
		return this.databaseService.user.findFirst({
			where: params,
			select: SECURITY_USER_SELECT,
		});
	}

	async getOneByLogin(params: GetOneByEmailParams): Promise<UserModel | null> {
		return this.databaseService.user.findFirst({
			where: params,
		});
	}

	async isActivated(params: IsActivatedParams): Promise<boolean> {
		const user = await this.databaseService.user.findFirst({
			where: {
				...params,
				activated: true,
			},
		});

		return Boolean(user);
	}

	async activate(params: ActivateParams): Promise<boolean> {
		const user = await this.databaseService.user.update({
			where: params,
			data: {
				activated: true,
			},
			select: SECURITY_USER_SELECT,
		});

		return Boolean(user);
	}

	async create(params: CreateData): Promise<SecurityUserDto> {
		return this.databaseService.user.create({
			data: params,
			select: SECURITY_USER_SELECT,
		});
	}

	async update(params: UpdateParams): Promise<SecurityUserDto> {
		const { id, ...data } = params;

		return this.databaseService.user.update({
			data,
			where: {
				id,
			},
			select: SECURITY_USER_SELECT,
		});
	}
}
