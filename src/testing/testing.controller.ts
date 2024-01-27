import {
	Body,
	Controller,
	Delete,
	HttpCode,
	Post,
	Query,
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
import { TestingService } from './testing.service';
import {
	TestingInvitationDto,
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

	@Post('/login')
	async auth(
		@Body() params: TestingUserDto,
		@Response({ passthrough: true, }) res: ExpressResponse
	): Promise<AuthenticationResultDto> {
		const result = await this.testingService.login(params);

		res.cookie(COOKIE_NAME, result.tokens.refreshToken, {
			...BASE_COOKIE_OPTIONS,
			maxAge: COOKIE_TIME,
		});

		return result;
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
	@ApiOkResponse({
		type: Boolean,
		description: 'There was any user removed',
	})
	@HttpCode(HttpStatus.OK)
	@Delete('/user')
	removeUser(@Query() params: TestingUserDto): Promise<boolean> {
		return this.testingService.removeUser(params);
	}

	@ApiOperation({
		summary: 'Get or create room',
	})
	@ApiBody({
		type: TestingUserDto,
		description: 'Filter to select or data to create',
		required: false,
	})
	@ApiOkResponse({
		type: UserDto,
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
	@ApiOkResponse({
		type: Boolean,
		description: 'There was any room removed',
	})
	@HttpCode(HttpStatus.OK)
	@Delete('/room')
	removeRoom(@Query() params: TestingRoomDto): Promise<boolean> {
		return this.testingService.removeRoom(params);
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
