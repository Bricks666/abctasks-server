import { Injectable } from '@nestjs/common';
import { room_user } from '@prisma/client';
import { DatabaseService } from '@/database/database.service';
import { SecurityUserDto } from '@/users/dto';
import {
	AddInvitationParams,
	AddUserParams,
	ExistsUserParams,
	GetInvitationsParams,
	GetUsersParams,
	IsInvitedParams,
	RemoveUserParams
} from './types';

@Injectable()
export class Repository {
	constructor(private readonly databaseService: DatabaseService) {}

	async getUsers(params: GetUsersParams): Promise<SecurityUserDto[]> {
		const { roomId, } = params;

		const pairs = await this.databaseService.room_user.findMany({
			where: {
				roomId,
				removed: false,
				activated: true,
			},
			include: {
				user: {
					select: {
						id: true,
						login: true,
						photo: true,
					},
				},
			},
		});

		return pairs.map((pair) => pair.user);
	}

	async addInvitation(params: AddInvitationParams): Promise<SecurityUserDto> {
		const result = await this.databaseService.room_user.create({
			data: {
				...params,
			},
			include: {
				user: {
					select: {
						id: true,
						login: true,
						photo: true,
					},
				},
			},
		});

		return result.user;
	}

	async isInvited(params: IsInvitedParams): Promise<boolean> {
		const user = await this.databaseService.room_user.findFirst({
			where: {
				...params,
				activated: false,
			},
		});

		return user?.activated === false;
	}

	async getInvitations(
		params: GetInvitationsParams
	): Promise<SecurityUserDto[]> {
		const rows = await this.databaseService.room_user.findMany({
			where: {
				...params,
				activated: false,
			},
			include: {
				user: {
					select: {
						id: true,
						photo: true,
						login: true,
					},
				},
			},
		});

		return rows.map((row) => row.user);
	}

	/*
  Может стоит как либо декомпозировать
  */
	async addUser(params: AddUserParams): Promise<boolean> {
		const pair: room_user | null =
			await this.databaseService.room_user.findFirst({
				where: params,
			});

		if (!pair) {
			await this.databaseService.room_user.create({
				data: { ...params, activated: true, },
			});

			return true;
		}

		if (pair.removed) {
			await this.databaseService.room_user.update({
				data: {
					removed: false,
				},
				where: {
					roomId_userId: params,
				},
			});

			return true;
		}

		if (!pair.activated) {
			await this.databaseService.room_user.update({
				data: {
					activated: true,
				},
				where: {
					roomId_userId: params,
				},
			});

			return true;
		}

		return false;
	}

	async removeUser(params: RemoveUserParams): Promise<boolean> {
		const pair = await this.databaseService.room_user.findFirst({
			where: { ...params, activated: true, },
		});

		if (!pair || pair.removed) {
			return false;
		}

		await this.databaseService.room_user.update({
			data: {
				removed: true,
			},

			where: {
				roomId_userId: params,
			},
		});

		return true;
	}

	async removeUserHard(params: RemoveUserParams): Promise<boolean> {
		const { count, } = await this.databaseService.room_user.deleteMany({
			where: params,
		});

		return Boolean(count);
	}

	async existsUser(params: ExistsUserParams): Promise<boolean> {
		const { roomId, userId, } = params;

		const pair = await this.databaseService.room_user.findFirst({
			where: {
				userId,
				roomId,
				removed: false,
				activated: true,
			},
		});

		return Boolean(pair);
	}
}
