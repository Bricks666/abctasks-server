import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@/database/database.service';
import { SecurityUserDto } from '@/users/dto';
import { RepositoryParams, RepositoryParamsWithData } from '@/common';
import {
	AddUserData,
	ExistsUserFilters,
	GetUsersFilters,
	RemoveUserData
} from './types/room-user';

@Injectable()
export class RoomUserRepository {
	constructor(private readonly databaseService: DatabaseService) {}

	async getUsers(
		params: RepositoryParams<GetUsersFilters>
	): Promise<SecurityUserDto[]> {
		const { filters, } = params;
		const { roomId, } = filters;

		const pairs = await this.databaseService.room_user.findMany({
			where: {
				roomId,
				removed: false,
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

	async addUser(
		params: RepositoryParamsWithData<AddUserData, never>
	): Promise<boolean> {
		const { data, } = params;
		const { roomId, userId, } = data;

		const pair = await this.databaseService.room_user.findFirst({
			where: {
				roomId,
				userId,
			},
		});

		if (pair.removed) {
			await this.databaseService.room_user.update({
				data: {
					removed: false,
				},
				where: {
					roomId_userId: {
						roomId,
						userId,
					},
				},
			});

			return true;
		}

		if (!pair.removed) {
			return false;
		}

		await this.databaseService.room_user.create({
			data: {
				roomId,
				userId,
			},
		});

		return true;
	}

	async removeUser(
		params: RepositoryParamsWithData<RemoveUserData, never>
	): Promise<boolean> {
		const { data, } = params;
		const { roomId, userId, } = data;

		const pair = await this.databaseService.room_user.findFirst({
			where: {
				roomId,
				userId,
			},
		});

		if (!pair || pair.removed) {
			return false;
		}

		if (!pair.removed) {
			await this.databaseService.room_user.update({
				data: {
					removed: true,
				},

				where: {
					roomId_userId: {
						roomId,
						userId,
					},
				},
			});

			return true;
		}

		await this.databaseService.room_user.create({
			data: {
				roomId,
				userId,
			},
		});

		return true;
	}

	async existsUser(
		params: RepositoryParams<ExistsUserFilters>
	): Promise<boolean> {
		const { filters, } = params;
		const { roomId, userId, } = filters;

		return this.databaseService.room_user
			.count({
				where: {
					userId,
					roomId,
					removed: false,
				},
			})
			.then((pair) => pair !== 0);
	}
}
