import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@/database/database.service';
import { SecurityUserDto } from '@/users/dto';

@Injectable()
export class RoomUserRepository {
	constructor(private readonly databaseService: DatabaseService) {}

	async getUsers(roomId: number): Promise<SecurityUserDto[]> {
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

	async addUser(roomId: number, userId: number): Promise<boolean> {
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

	async removeUser(roomId: number, userId: number): Promise<boolean> {
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

	async existsUser(roomId: number, userId: number): Promise<boolean> {
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
