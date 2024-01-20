import { Injectable } from '@nestjs/common';

import { hash } from 'bcrypt';
import { DatabaseService } from '@/database';
import { MemberDto } from '@/members/dto';
import { RoomInvitationDto } from '@/room-invitations/dto';
import { RoomDto } from '@/rooms';
import { TagDto } from '@/tags';
import { TaskDto } from '@/tasks';
import { UserDto } from '@/users';

import {
	TestingUserDto,
	TestingRoomDto,
	TestingTaskDto,
	TestingTagDto,
	TestingMemberDto,
	TestingInvitationDto
} from './dto';
import {
	convertTestingUserDtoToCreateData,
	convertTestingUserDtoToUserFilter
} from './lib';

@Injectable()
export class TestingService {
	constructor(private readonly databaseService: DatabaseService) {}

	async user(params: TestingUserDto): Promise<UserDto> {
		const where = convertTestingUserDtoToUserFilter(params);

		const existing = await this.databaseService.user.findFirst({
			where,
		});

		if (existing) {
			return existing;
		}

		const data = convertTestingUserDtoToCreateData(params);

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
}
