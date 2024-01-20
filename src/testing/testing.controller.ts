import { Body, Controller, Delete, Post, Query } from '@nestjs/common';
import { UserDto } from '@/users';
import { RoomDto } from '@/rooms';
import { TaskDto } from '@/tasks';
import { TagDto } from '@/tags';
import { MemberDto } from '@/members/dto';
import { RoomInvitationDto } from '@/room-invitations/dto';
import { DisableAuthCheck, DisableIsActivatedCheck } from '@/auth';
import { TestingService } from './testing.service';
import {
	TestingInvitationDto,
	TestingMemberDto,
	TestingRoomDto,
	TestingTagDto,
	TestingTaskDto,
	TestingUserDto
} from './dto';

@DisableIsActivatedCheck()
@DisableAuthCheck()
@Controller('testing')
export class TestingController {
	constructor(private readonly testingService: TestingService) {}

	@Post('/user')
	user(@Body() params: TestingUserDto): Promise<UserDto> {
		return this.testingService.user(params);
	}

	@Delete('/user')
	removeUser(@Query() params: TestingUserDto): Promise<boolean> {
		return this.testingService.removeUser(params);
	}

	@Post('/room')
	room(@Body() params: TestingRoomDto): Promise<RoomDto> {
		return this.testingService.room(params);
	}

	@Post('/task')
	task(@Body() params: TestingTaskDto): Promise<TaskDto> {
		return this.testingService.task(params);
	}

	@Post('/tag')
	tag(@Body() params: TestingTagDto): Promise<TagDto> {
		return this.testingService.tag(params);
	}

	@Post('/member')
	member(@Body() params: TestingMemberDto): Promise<MemberDto> {
		return this.testingService.member(params);
	}

	@Post('/invitation')
	invitation(@Body() params: TestingInvitationDto): Promise<RoomInvitationDto> {
		return this.testingService.invitation(params);
	}
}
