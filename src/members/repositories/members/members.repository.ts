import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@/database';
import { SecurityUserDto, SECURITY_USER_SELECT } from '@/users';
import {
	ActivateUserParams,
	AddInvitationParams,
	ExistsMemberParams,
	GetInvitationsParams,
	GetUsersParams,
	IsInvitedParams,
	RemoveMemberParams
} from './types';

@Injectable()
export class MembersRepository {
	constructor(private readonly databaseService: DatabaseService) {}

	async getMembers(params: GetUsersParams): Promise<SecurityUserDto[]> {
		const { roomId, } = params;

		const pairs = await this.databaseService.member.findMany({
			where: {
				roomId,
				status: 'activated',
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
		const rows = await this.databaseService.member.findMany({
			where: {
				...params,
				status: 'invited',
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
		const isExited = await this.databaseService.member.findFirst({
			where: {
				...params,
				status: 'removed',
			},
		});

		if (isExited) {
			const result = await this.databaseService.member.update({
				data: {
					status: 'invited',
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

		const result = await this.databaseService.member.create({
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
		const user = await this.databaseService.member.findFirst({
			where: {
				...params,
				status: 'invited',
			},
		});

		return Boolean(user);
	}

	async activateMember(
		params: ActivateUserParams
	): Promise<SecurityUserDto | null> {
		const result = await this.databaseService.member.update({
			data: { status: 'activated', },
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

	async removeMember(params: RemoveMemberParams): Promise<boolean> {
		const pair = await this.databaseService.member.findFirst({
			where: { ...params, status: 'activated', },
		});

		if (!pair) {
			return false;
		}

		await this.databaseService.member.update({
			data: {
				status: 'removed',
			},

			where: {
				roomId_userId: params,
			},
		});

		return true;
	}

	async removeMemberInvitation(params: RemoveMemberParams): Promise<boolean> {
		const { count, } = await this.databaseService.member.updateMany({
			where: { ...params, status: 'invited', },
			data: {
				status: 'removed',
			},
		});

		return Boolean(count);
	}

	async existsUser(params: ExistsMemberParams): Promise<boolean> {
		const { roomId, userId, } = params;

		const pair = await this.databaseService.member.findFirst({
			where: {
				userId,
				roomId,
				status: 'activated',
			},
		});

		return Boolean(pair);
	}
}
