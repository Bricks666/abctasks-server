import { Injectable } from '@nestjs/common';

import { hash } from 'bcrypt';
import { PrismaDatabaseService } from '@bricks-ether/server-utils/nestjs';
import { MemberDto } from '@/members/dto';
import { RoomInvitationDto } from '@/room-invitations/dto';
import { RoomDto } from '@/rooms';
import { TagDto } from '@/tags';
import { TaskDto, convertTaskRecordToTaskDto } from '@/tasks';
import { UserDto } from '@/users';

import { AuthenticationResultDto, TokensDto } from '@/auth';
import { TokensService } from '@/tokens/tokens.service';
import { taskSelect } from '@/tasks/repositories';
import { invitationSelect } from '@/room-invitations/repositories';
import {
	ActivityDto,
	activitySelect,
	convertActivityRecordToActivityDto
} from '@/activities';
import {
	TestingUserDto,
	TestingRoomDto,
	TestingTaskDto,
	TestingTagDto,
	TestingMemberDto,
	TestingInvitationDto,
	TestingLoginDto,
	TestingActivityDto
} from './dto';
import {
	convertTestingRoomDtoToRoomData,
	convertTestingRoomDtoToRoomFilter,
	convertTestingUserDtoToUserData,
	convertTestingUserDtoToUserUniqueFilter,
	convertTestingUserDtoToUserFilter,
	convertTestingRoomDtoToRoomUniqueFilter,
	convertTestingMemberDtoToMemberUniqueFilter,
	convertTestingMemberDtoToMemberData,
	convertTestingMemberDtoToMemberFilter,
	convertTestingTagDtoToTagUniqueFilter,
	convertTestingTagDtoToTagData,
	convertTestingTagDtoToTagFilter,
	convertTestingTaskDtoToTaskUniqueFilter,
	convertTestingTaskDtoToTaskData,
	convertTestingTaskDtoToTaskFilter,
	convertTestingInvitationDtoToInvitationUniqueFilter,
	convertTestingInvitationDtoToInvitationData,
	convertTestingInvitationDtoToInvitationFilter,
	convertTestingActivityDtoToActivityUniqueFilter,
	convertTestingActivityDtoToActivityData,
	convertTestingActivityDtoToActivityFilter
} from './lib';

@Injectable()
export class TestingService {
	constructor(
		private readonly databaseService: PrismaDatabaseService,
		private readonly tokensService: TokensService
	) {}

	async login(params: TestingLoginDto = {}): Promise<AuthenticationResultDto> {
		const user = await this.user(params);

		const tokens = await this.#generateTokens(user);

		return { user, tokens, };
	}

	async activateAccountLink(params: TestingUserDto = {}): Promise<string> {
		const user = await this.user(params);

		const tokens = await this.#generateTokens(user);

		return `${process.env.CLIENT_APP_HOST}/registration/activate?token=${tokens.refreshToken}`;
	}

	async activity(params: TestingActivityDto = {}): Promise<ActivityDto> {
		const activist = await this.user(params.activist);
		const room = await this.room(params.room);
		const where = convertTestingActivityDtoToActivityUniqueFilter(params);

		if (where) {
			const existing = await this.databaseService.activity.findUnique({
				where,
				select: activitySelect,
			});

			if (existing) {
				return convertActivityRecordToActivityDto(existing);
			}
		}

		const data = convertTestingActivityDtoToActivityData({
			...params,
			room,
			activist,
		});
		return this.databaseService.activity
			.create({
				data,
				select: activitySelect,
			})
			.then(convertActivityRecordToActivityDto);
	}

	async removeActivity(params: TestingActivityDto = {}): Promise<boolean> {
		const where = convertTestingActivityDtoToActivityFilter(params);

		return this.databaseService.activity
			.deleteMany({ where, })
			.then(({ count, }) => !!count);
	}

	async user(params: TestingUserDto = {}): Promise<UserDto> {
		const where = convertTestingUserDtoToUserUniqueFilter(params);

		if (where) {
			const existing = await this.databaseService.user.findFirst({
				where,
			});

			if (existing) {
				return existing;
			}
		}

		const data = convertTestingUserDtoToUserData(params);
		const password = await hash(data.password, Number(process.env.ROUND_COUNT));

		return this.databaseService.user.create({
			data: {
				...data,
				password,
			},
		});
	}

	async removeUser(params: TestingUserDto = {}): Promise<boolean> {
		const where = convertTestingUserDtoToUserFilter(params);

		return this.databaseService.user
			.deleteMany({
				where,
			})
			.then(({ count, }) => !!count);
	}

	async room(params: TestingRoomDto = {}): Promise<RoomDto> {
		const user = await this.user({ id: params.ownerId, });

		const where = convertTestingRoomDtoToRoomUniqueFilter({
			...params,
			ownerId: user.id,
		});

		if (where) {
			const existing = await this.databaseService.room.findUnique({
				where,
			});

			if (existing) {
				return existing;
			}
		}

		const data = convertTestingRoomDtoToRoomData({
			...params,
			ownerId: user.id,
		});

		return this.databaseService.room.create({
			data,
		});
	}

	async removeRoom(params: TestingRoomDto = {}): Promise<boolean> {
		const where = convertTestingRoomDtoToRoomFilter(params);

		return this.databaseService.room
			.deleteMany({
				where,
			})
			.then(({ count, }) => !!count);
	}

	async task(params: TestingTaskDto = {}): Promise<TaskDto> {
		const author = await this.user(params.author);
		const room = await this.room(params.room);
		const tags = await Promise.all(
			params.tags.map((tag) => this.tag({ ...tag, room, }))
		);
		const where = convertTestingTaskDtoToTaskUniqueFilter({
			...params,
			author,
			room,
			tags,
		});

		if (where) {
			const existing = await this.databaseService.task.findFirst({
				where,
				select: taskSelect,
			});

			if (existing) {
				return convertTaskRecordToTaskDto(existing);
			}
		}

		const data = convertTestingTaskDtoToTaskData({
			...params,
			author,
			room,
			tags,
		});

		return this.databaseService.task
			.create({
				data,
				select: taskSelect,
			})
			.then(convertTaskRecordToTaskDto);
	}

	async removeTask(params: TestingTaskDto = {}): Promise<boolean> {
		const where = convertTestingTaskDtoToTaskFilter(params);

		return this.databaseService.task
			.deleteMany({
				where,
			})
			.then(({ count, }) => !!count);
	}

	async tag(params: TestingTagDto = {}): Promise<TagDto> {
		const room = await this.room(params.room);

		const where = convertTestingTagDtoToTagUniqueFilter({ ...params, room, });

		if (where) {
			const existing = await this.databaseService.tag.findUnique({
				where,
			});

			if (existing) {
				return existing as TagDto;
			}
		}

		const data = convertTestingTagDtoToTagData({ ...params, room, });

		return this.databaseService.tag.create({
			data,
		}) as Promise<TagDto>;
	}

	async removeTag(params: TestingTagDto = {}): Promise<boolean> {
		const room = await this.room(params.room);
		const where = convertTestingTagDtoToTagFilter({
			...params,
			room,
		});

		return this.databaseService.tag
			.deleteMany({
				where,
			})
			.then(({ count, }) => !!count);
	}

	async member(params: TestingMemberDto = {}): Promise<MemberDto> {
		const user = await this.user(params.user);
		const room = await this.room(params.room);
		const where = convertTestingMemberDtoToMemberUniqueFilter({
			...params,
			user,
			room,
		});

		if (where) {
			const existing = await this.databaseService.member.findUnique({
				where,
			});

			if (existing) {
				return existing;
			}
		}

		const data = convertTestingMemberDtoToMemberData({
			...params,
			user,
			room,
		});

		return this.databaseService.member.create({
			data,
		});
	}

	async removeMember(params: TestingMemberDto = {}): Promise<boolean> {
		const where = convertTestingMemberDtoToMemberFilter(params);

		return this.databaseService.member
			.deleteMany({
				where,
			})
			.then(({ count, }) => !!count);
	}

	async invitation(
		params: TestingInvitationDto = {}
	): Promise<RoomInvitationDto> {
		const inviter = await this.user(params.inviter);
		const user = await this.user(params.user);
		const room = await this.room(params.room);

		const where = convertTestingInvitationDtoToInvitationUniqueFilter({
			...params,
			inviter,
			user,
			room,
		});

		if (where) {
			const existing = await this.databaseService.roomInvitation.findFirst({
				where,
				select: invitationSelect,
			});

			if (existing) {
				return existing;
			}
		}

		const data = convertTestingInvitationDtoToInvitationData({
			...params,
			inviter,
			user,
			room,
		});

		return this.databaseService.roomInvitation.create({
			data,
			select: invitationSelect,
		});
	}

	async removeInvitation(params: TestingInvitationDto = {}): Promise<boolean> {
		const where = convertTestingInvitationDtoToInvitationFilter(params);

		return this.databaseService.roomInvitation
			.deleteMany({
				where,
			})
			.then(({ count, }) => !!count);
	}

	async invitationLink(params: TestingInvitationDto = {}): Promise<string> {
		const invitation = await this.invitation(params);

		const token = await this.tokensService.generateInsecure({
			roomId: invitation.room.id,
			userId: invitation.inviter.id,
			id: invitation.id,
		});

		return `${process.env.CLIENT_APP_HOST}/rooms/invite?token=${token}`;
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
