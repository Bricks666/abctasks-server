import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@/database';
import { SecurityUserDto, SECURITY_USER_SELECT } from '@/users';
import { RoomUserDto } from '../../dto';
import {
	ActivateUserParams,
	AddInvitationParams,
	AddUserParams,
	ExistsUserParams,
	GetInvitationsParams,
	GetUsersParams,
	IsInvitedParams,
	RemoveUserParams
} from './types';

@Injectable()
export class RoomUserRepository {
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
					select: SECURITY_USER_SELECT,
				},
			},
		});

		return pairs.map((pair) => pair.user);
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
					select: SECURITY_USER_SELECT,
				},
			},
		});

		return rows.map((row) => row.user);
	}

	async addInvitation(params: AddInvitationParams): Promise<SecurityUserDto> {
		const isExited = await this.databaseService.room_user.findFirst({
			where: {
				...params,
				removed: true,
				activated: true,
			},
		});

		if (isExited) {
			const result = await this.databaseService.room_user.update({
				data: {
					activated: false,
					removed: false,
				},
				where: {
					roomId_userId: params,
				},
				include: {
					user: {
						select: SECURITY_USER_SELECT,
					},
				},
			});

			return result.user;
		}

		const result = await this.databaseService.room_user.create({
			data: {
				...params,
			},
			include: {
				user: {
					select: SECURITY_USER_SELECT,
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

		return Boolean(user);
	}

	async activateUser(
		params: ActivateUserParams
	): Promise<SecurityUserDto | null> {
		const result = await this.databaseService.room_user.update({
			data: {
				activated: true,
			},
			where: {
				roomId_userId: params,
			},
			include: {
				user: {
					select: SECURITY_USER_SELECT,
				},
			},
		});

		return result.user;
	}

	/*
  Может стоит как либо декомпозировать
  */
	async addUser(params: AddUserParams): Promise<SecurityUserDto | null> {
		const pair: RoomUserDto | null =
			await this.databaseService.room_user.findFirst({
				where: params,
			});

		if (!pair) {
			const result = await this.databaseService.room_user.create({
				data: { ...params, activated: true, },
				include: {
					user: {
						select: SECURITY_USER_SELECT,
					},
				},
			});

			return result.user;
		}

		if (pair.removed) {
			const result = await this.databaseService.room_user.update({
				data: {
					removed: false,
					activated: true,
				},
				where: {
					roomId_userId: params,
				},
				include: {
					user: {
						select: SECURITY_USER_SELECT,
					},
				},
			});

			return result.user;
		}

		return null;
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
