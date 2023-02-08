import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@/database/database.service';
import { SecurityUserDto } from '@/users/dto';
import {
	AddUserParams,
	ExistsUserParams,
	GetUsersParams,
	RemoveUserParams
} from './types/room-user';

@Injectable()
export class RoomUserRepository {
	constructor(private readonly databaseService: DatabaseService) {}

	async getUsers(params: GetUsersParams): Promise<SecurityUserDto[]> {
		const { roomId, } = params;

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

	async addUser(params: AddUserParams): Promise<boolean> {
		const pair = await this.databaseService.room_user.findFirst({
			where: params,
		});

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

		if (!pair.removed) {
			return false;
		}

		await this.databaseService.room_user.create({
			data: params,
		});

		return true;
	}

	async removeUser(params: RemoveUserParams): Promise<boolean> {
		const pair = await this.databaseService.room_user.findFirst({
			where: params,
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
					roomId_userId: params,
				},
			});

			return true;
		}

		await this.databaseService.room_user.create({
			data: params,
		});

		return true;
	}

	async existsUser(params: ExistsUserParams): Promise<boolean> {
		const { roomId, userId, } = params;

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
