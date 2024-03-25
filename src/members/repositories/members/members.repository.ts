import { Injectable } from '@nestjs/common';
import { PrismaDatabaseService } from '@bricks-ether/server-utils/nestjs';
import { SECURITY_USER_SELECT } from '@/users/repositories';
import { SecurityUserDto } from '@/users/dto';
import {
	AddMemberParams,
	ExistsMemberParams,
	GetMembersParams,
	RemoveMemberParams,
	UpdateMemberParams
} from './types';

@Injectable()
export class MembersRepository {
	constructor(private readonly databaseService: PrismaDatabaseService) {}

	async getAllActivated(params: GetMembersParams): Promise<SecurityUserDto[]> {
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

	async create(params: AddMemberParams): Promise<SecurityUserDto> {
		const { roomId, userId, } = params;

		const members = await this.databaseService.member.create({
			data: {
				userId,
				roomId,
			},
			include: {
				user: {
					select: SECURITY_USER_SELECT,
				},
			},
		});

		return members.user;
	}

	async update(params: UpdateMemberParams): Promise<SecurityUserDto> {
		const { roomId, status, userId, } = params;

		const member = await this.databaseService.member.update({
			where: {
				roomId_userId: {
					roomId,
					userId,
				},
			},
			data: {
				status,
			},
			include: {
				user: {
					select: SECURITY_USER_SELECT,
				},
			},
		});

		return member.user;
	}

	async remove(params: RemoveMemberParams): Promise<boolean> {
		return this.databaseService.member
			.update({
				where: {
					roomId_userId: {
						roomId: params.roomId,
						userId: params.userId,
					},
				},
				data: {
					status: 'removed',
				},
			})
			.then(() => true)
			.catch(() => false);
	}

	async existsActivated(params: ExistsMemberParams): Promise<boolean> {
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
