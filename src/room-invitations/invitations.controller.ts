import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put
} from '@nestjs/common';
import {
	ApiBody,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiTags
} from '@nestjs/swagger';
import { Auth, CurrentUser } from '@/auth/lib';
import { SecurityUserDto } from '@/users/dto';
import { IntParam } from '@/shared';
import { IsOwner } from '@/rooms/lib';
import { RoomInvitationsService } from './services';
import {
	AnswerInvitationDto,
	CreateRoomInvitationDto,
	RoomInvitationDto
} from './dto';

@ApiTags('Приглашения')
@Auth()
@Controller('invitations')
export class RoomInvitationsController {
	constructor(private readonly invitationsService: RoomInvitationsService) {}

	@ApiOperation({
		summary: 'Возвращает все активные приглашения',
	})
	@ApiOkResponse({
		type: () => RoomInvitationDto,
		isArray: true,
	})
	@ApiNotFoundResponse({
		description: 'Такой комнаты не существует',
	})
	@Get('/:roomId')
	async getRoomInvitations(
		@IntParam('roomId') roomId: number
	): Promise<RoomInvitationDto[]> {
		return this.invitationsService.getRoomInvitations({ roomId, });
	}

	@ApiOperation({
		summary: 'Get invitation via token',
		description:
			'Should be used for taking invitation via token from invitation link',
	})
	@ApiOkResponse({
		type: () => RoomInvitationDto,
	})
	@ApiNotFoundResponse({
		description: 'Invitation not exists',
	})
	@Get('/via/:token')
	getOneViaToken(
		@Param('token') token: string,
		@CurrentUser() user: SecurityUserDto
	): Promise<RoomInvitationDto> {
		return this.invitationsService.getOneViaToken({
			token,
			userId: user.id,
		});
	}

	@ApiOperation({
		summary: 'Generate link for widespread',
	})
	@ApiOkResponse({
		type: String,
		description: 'Ссылка дял добавления',
	})
	@IsOwner()
	@Post('/invite/:roomId/generate-link')
	async generateInviteLink(
		@IntParam('roomId') roomId: number,
		@CurrentUser() user: SecurityUserDto
	): Promise<string> {
		return this.invitationsService.createMassInvitation({
			roomId,
			inviterId: user.id,
		});
	}

	@ApiOperation({
		summary: 'Send to user personal invitation',
	})
	@ApiOkResponse({
		type: () => RoomInvitationDto,
		description: 'New invitation',
	})
	@IsOwner()
	@Put('/invite/:roomId')
	async invite(
		@IntParam('roomId') roomId: number,
		@Body() body: CreateRoomInvitationDto,
		@CurrentUser() user: SecurityUserDto
	): Promise<RoomInvitationDto> {
		return this.invitationsService.createPersonalInvitation({
			...body,
			roomId,
			inviterId: user.id,
		});
	}

	@ApiOperation({
		summary: 'Принятие приглашения в комнату',
	})
	@ApiBody({
		type: AnswerInvitationDto,
	})
	@ApiOkResponse({
		type: Boolean,
		description: 'Was invitation approved',
	})
	@Put('invite/approve')
	async approve(
		@Body() body: AnswerInvitationDto,
		@CurrentUser() user: SecurityUserDto
	): Promise<boolean> {
		return this.invitationsService.approve({
			id: body.id,
			userId: user.id,
		});
	}

	@ApiOperation({
		summary: 'Reject invitation',
	})
	@ApiBody({
		type: AnswerInvitationDto,
	})
	@ApiOkResponse({
		type: Boolean,
		description: 'Отклонилось ли приглашение',
	})
	@Put('invite/reject')
	async reject(
		@Body() body: AnswerInvitationDto,

		@CurrentUser() user: SecurityUserDto
	): Promise<boolean> {
		return this.invitationsService.reject({
			id: body.id,
			userId: user.id,
		});
	}

	@ApiOperation({
		summary: 'Remove invitation',
	})
	@ApiOkResponse({
		type: Boolean,
		description: 'Удалилось ли приглашение',
	})
	@IsOwner()
	@Delete('invite/:roomId/:id')
	async remove(@IntParam('id') id: number): Promise<boolean> {
		return this.invitationsService.remove({ id, });
	}
}
