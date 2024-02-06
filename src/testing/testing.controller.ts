import {
	Body,
	Controller,
	Put,
	HttpCode,
	Post,
	Response,
	HttpStatus
} from '@nestjs/common';
import { Response as ExpressResponse } from 'express';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserDto } from '@/users';
import { RoomDto } from '@/rooms';
import { TaskDto } from '@/tasks';
import { TagDto } from '@/tags';
import { MemberDto } from '@/members/dto';
import { RoomInvitationDto } from '@/room-invitations/dto';
import {
	AuthenticationResultDto,
	DisableAuthCheck,
	DisableIsActivatedCheck
} from '@/auth';
import { BASE_COOKIE_OPTIONS, COOKIE_NAME, COOKIE_TIME } from '@/const';
import { ActivityDto } from '@/activities';
import { TestingService } from './testing.service';
import {
	TestingActivityDto,
	TestingInvitationDto,
	TestingLoginDto,
	TestingMemberDto,
	TestingRoomDto,
	TestingTagDto,
	TestingTaskDto,
	TestingUserDto
} from './dto';

@ApiTags('Testing')
@DisableIsActivatedCheck()
@DisableAuthCheck()
@Controller('testing')
export class TestingController {
	constructor(private readonly testingService: TestingService) {}

	@ApiOperation({
		summary: 'Login into account',
		description:
			'Login into user account with passed params. If there is not user with passed params, It will be created',
	})
	@ApiBody({
		type: TestingLoginDto,
		description: 'Data of account for login',
	})
	@ApiOkResponse({
		type: AuthenticationResultDto,
		description: 'User and auth token',
	})
	@HttpCode(HttpStatus.OK)
	@Post('/auth')
	async auth(
		@Body() params: TestingLoginDto,
		@Response({ passthrough: true, }) res: ExpressResponse
	): Promise<AuthenticationResultDto> {
		const result = await this.testingService.login(params);

		const options = {
			...BASE_COOKIE_OPTIONS,
		};

		if (params.remember ?? true) {
			options.maxAge = COOKIE_TIME;
		}

		res.cookie(COOKIE_NAME, result.tokens.refreshToken, options);

		return result;
	}

	@ApiOperation({
		summary: 'Logout from current logged in account',
	})
	@ApiOkResponse({
		type: Boolean,
	})
	@Put('/logout')
	async logout(
		@Response({ passthrough: true, }) res: ExpressResponse
	): Promise<boolean> {
		res.clearCookie(COOKIE_NAME);

		return true;
	}

	@ApiOperation({
		summary: 'Get or create user',
	})
	@ApiBody({
		type: TestingUserDto,
		description: 'Filter to select or data to create',
		required: false,
	})
	@ApiOkResponse({
		type: UserDto,
		description: 'User with requested params',
	})
	@HttpCode(HttpStatus.OK)
	@Post('/user')
	user(@Body() params: TestingUserDto): Promise<UserDto> {
		return this.testingService.user(params);
	}

	@ApiOperation({
		summary: 'Remove users via params',
	})
	@ApiBody({
		type: TestingUserDto,
		description: 'Filter to remove',
		required: false,
	})
	@ApiOkResponse({
		type: Boolean,
		description: 'There was any user removed',
	})
	@HttpCode(HttpStatus.OK)
	@Put('/user')
	removeUser(@Body() params: TestingUserDto): Promise<boolean> {
		return this.testingService.removeUser(params);
	}

	@ApiOperation({
		summary: 'Get or create room',
	})
	@ApiBody({
		type: TestingRoomDto,
		description: 'Filter to select or data to create',
		required: false,
	})
	@ApiOkResponse({
		type: RoomDto,
		description: 'Room with requested params',
	})
	@HttpCode(HttpStatus.OK)
	@Post('/room')
	room(@Body() params: TestingRoomDto): Promise<RoomDto> {
		return this.testingService.room(params);
	}

	@ApiOperation({
		summary: 'Remove rooms via params',
	})
	@ApiBody({
		type: TestingRoomDto,
		description: 'Filter to remove',
		required: false,
	})
	@ApiOkResponse({
		type: Boolean,
		description: 'There was any room removed',
	})
	@HttpCode(HttpStatus.OK)
	@Put('/room')
	removeRoom(@Body() params: TestingRoomDto): Promise<boolean> {
		return this.testingService.removeRoom(params);
	}

	@ApiOperation({
		summary: 'Get or create task',
	})
	@ApiBody({
		type: TestingTaskDto,
		description: 'Filter to select or data to create',
		required: false,
	})
	@ApiOkResponse({
		type: TaskDto,
		description: 'Task with requested params',
	})
	@HttpCode(HttpStatus.OK)
	@Post('/task')
	task(@Body() params: TestingTaskDto): Promise<TaskDto> {
		return this.testingService.task(params);
	}

	@ApiOperation({
		summary: 'Remove task via params',
	})
	@ApiBody({
		type: TestingTaskDto,
		description: 'Filter to remove',
		required: false,
	})
	@ApiOkResponse({
		type: Boolean,
		description: 'There was any task removed',
	})
	@HttpCode(HttpStatus.OK)
	@Put('/task')
	removeTask(@Body() params: TestingTaskDto): Promise<boolean> {
		return this.testingService.removeTask(params);
	}

	@ApiOperation({
		summary: 'Get or create tag',
	})
	@ApiBody({
		type: TestingTagDto,
		description: 'Filter to select or data to create',
		required: false,
	})
	@ApiOkResponse({
		type: TagDto,
		description: 'Tag with requested params',
	})
	@HttpCode(HttpStatus.OK)
	@Post('/tag')
	tag(@Body() params: TestingTagDto): Promise<TagDto> {
		return this.testingService.tag(params);
	}

	@ApiOperation({
		summary: 'Remove tag via params',
	})
	@ApiBody({
		type: TestingTagDto,
		description: 'Filter to remove',
		required: false,
	})
	@ApiOkResponse({
		type: Boolean,
		description: 'There was any tag removed',
	})
	@HttpCode(HttpStatus.OK)
	@Put('/tag')
	removeTag(@Body() params: TestingTagDto): Promise<boolean> {
		return this.testingService.removeTag(params);
	}

	@ApiOperation({
		summary: 'Get or create member',
	})
	@ApiBody({
		type: TestingMemberDto,
		description: 'Filter to select or data to create',
		required: false,
	})
	@ApiOkResponse({
		type: MemberDto,
		description: 'Member with requested params',
	})
	@HttpCode(HttpStatus.OK)
	@Post('/member')
	member(@Body() params: TestingMemberDto): Promise<MemberDto> {
		return this.testingService.member(params);
	}

	@ApiOperation({
		summary: 'Remove members via params',
	})
	@ApiBody({
		type: TestingMemberDto,
		description: 'Filter to remove',
		required: false,
	})
	@ApiOkResponse({
		type: Boolean,
		description: 'There was any member removed',
	})
	@HttpCode(HttpStatus.OK)
	@Put('/member')
	removeMember(@Body() params: TestingMemberDto): Promise<boolean> {
		return this.testingService.removeMember(params);
	}

	@ApiOperation({
		summary: 'Get or create invitation',
	})
	@ApiBody({
		type: TestingInvitationDto,
		description: 'Filter to remove',
		required: false,
	})
	@ApiOkResponse({
		type: RoomInvitationDto,
		description: 'Invitation by params',
	})
	@HttpCode(HttpStatus.OK)
	@Post('/invitation')
	invitation(@Body() params: TestingInvitationDto): Promise<RoomInvitationDto> {
		return this.testingService.invitation(params);
	}

	@ApiOperation({
		summary: 'Remove invitations via params',
	})
	@ApiBody({
		type: TestingInvitationDto,
		description: 'Filter to remove',
		required: false,
	})
	@ApiOkResponse({
		type: Boolean,
		description: 'There was any invitation removed',
	})
	@HttpCode(HttpStatus.OK)
	@Put('/invitation')
	removeInvitation(@Body() params: TestingInvitationDto): Promise<boolean> {
		return this.testingService.removeInvitation(params);
	}

	@ApiOperation({
		summary: 'Get or create activity',
	})
	@ApiBody({
		type: TestingActivityDto,
		description: 'Filter to remove',
		required: false,
	})
	@ApiOkResponse({
		type: ActivityDto,
		description: 'There was any activity removed',
	})
	@HttpCode(HttpStatus.OK)
	@Post('/activity')
	activity(@Body() params: TestingActivityDto): Promise<ActivityDto> {
		return this.testingService.activity(params);
	}

	@ApiOperation({
		summary: 'Remove activities via params',
	})
	@ApiBody({
		type: TestingActivityDto,
		description: 'Filter to remove',
		required: false,
	})
	@ApiOkResponse({
		type: Boolean,
		description: 'There was any activities removed',
	})
	@HttpCode(HttpStatus.OK)
	@Put('/activity')
	removeActivity(@Body() params: TestingActivityDto): Promise<boolean> {
		return this.testingService.removeActivity(params);
	}
}
