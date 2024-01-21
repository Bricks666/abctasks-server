import { Injectable } from '@nestjs/common';

import { hash } from 'bcrypt';
import { DatabaseService } from '@/database';
import { MemberDto } from '@/members/dto';
import { RoomInvitationDto } from '@/room-invitations/dto';
import { RoomDto } from '@/rooms';
import { TagDto } from '@/tags';
import { TaskDto } from '@/tasks';
import { UserDto } from '@/users';

import { AuthenticationResultDto, TokensDto } from '@/auth';
import { TokensService } from '@/tokens/tokens.service';
import {
	TestingUserDto,
	TestingRoomDto,
	TestingTaskDto,
	TestingTagDto,
	TestingMemberDto,
	TestingInvitationDto
} from './dto';
import {
	convertTestingUserDtoToUserData,
	convertTestingUserDtoToUserFilter
} from './lib';

@Injectable()
export class TestingService {
	constructor(
		private readonly databaseService: DatabaseService,
		private readonly tokensService: TokensService
	) {}

	async login(params: TestingUserDto): Promise<AuthenticationResultDto> {
		const user = await this.user(params);

		const tokens = await this.#generateTokens(user);

		return { user, tokens, };
	}

	async user(params: TestingUserDto): Promise<UserDto> {
		const where = convertTestingUserDtoToUserFilter(params);

		const existing = await this.databaseService.user.findFirst({
			where,
		});

		if (existing) {
			return existing;
		}

		await this.databaseService.user.deleteMany({
			where: {
				email: where.email as string,
				id: where.id as number,
			},
		});

		const data = convertTestingUserDtoToUserData(params);

		const password = await hash(data.password, Number(process.env.ROUND_COUNT));

		return this.databaseService.user.create({
			data: {
				...data,
				password,
			},
		});
	}

	async removeUser(params: TestingUserDto): Promise<boolean> {
		return this.databaseService.user
			.deleteMany({
				where: convertTestingUserDtoToUserFilter(params),
			})
			.then(({ count, }) => !!count);
	}

	room(params: TestingRoomDto): Promise<RoomDto> {
		return params as any;
	}

	task(params: TestingTaskDto): Promise<TaskDto> {
		return params as any;
	}

	tag(params: TestingTagDto): Promise<TagDto> {
		return params as any;
	}

	member(params: TestingMemberDto): Promise<MemberDto> {
		return params as any;
	}

	invitation(params: TestingInvitationDto): Promise<RoomInvitationDto> {
		return params as any;
	}

	async #generateTokens(user: UserDto): Promise<TokensDto> {
		const accessToken = this.tokensService.generateSecure(user, '15m');
		const refreshToke = this.tokensService.generateSecure(user, '30d');

		const tokens = await Promise.all([refreshToke, accessToken]);
		return {
			refreshToken: tokens[0],
			accessToken: tokens[1],
		};
	}
}
