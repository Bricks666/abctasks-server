import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Put,
	Query
} from '@nestjs/common';
import {
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiQuery,
	ApiTags
} from '@nestjs/swagger';
import { Auth, CurrentUser } from '@/auth';
import { SecurityUserDto } from '@/users';
import { IntParam } from '@/shared';
import { IsOwner } from '@/rooms';
import { RoomInvitationsService } from './services/room-invitations/room-invitations.service';
import { CreateRoomInvitationDto, RoomInvitationDto } from './dto';

@ApiTags('Приглашения')
@Auth()
@Controller('invitations')
export class RoomInvitationsController {
	constructor(private readonly invitationsService: RoomInvitationsService) {}

	@ApiOperation({
		summary: 'Возвращает все активные приглашения',
	})
	@ApiOkResponse({
		type: RoomInvitationDto,
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
		type: RoomInvitationDto,
	})
	@ApiNotFoundResponse({
		description: 'Invitation not exists',
	})
	@IsOwner()
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
	@Get('/invite/:roomId/generate-link')
	async generateInviteLink(
		@IntParam('roomId') roomId: number
	): Promise<string> {
		return this.invitationsService.generateInvitationLink({ roomId, });
	}

	@ApiOperation({
		summary: 'Send to user personal invitation',
	})
	@ApiOkResponse({
		type: SecurityUserDto,
		description: 'New invitation',
	})
	@IsOwner()
	@Put('/invite')
	async invite(
		@Body() body: CreateRoomInvitationDto,
		@CurrentUser() user: SecurityUserDto
	) {
		return this.invitationsService.createPersonalInvitation({
			...body,
			inviterId: user.id,
		});
	}

	@ApiOperation({
		summary: 'Принятие приглашения в комнату',
	})
	@ApiOkResponse({
		type: SecurityUserDto,
		description: 'Updated invitation',
	})
	@ApiQuery({
		name: 'token',
		type: String,
		description: 'Invitation token from email or link',
	})
	@Put('invite/approve')
	async approve(
		@Query('token') token: string,
		@CurrentUser() user: SecurityUserDto
	): Promise<boolean> {
		return this.invitationsService.approve({
			token,
			userId: user.id,
		});
	}

	@ApiOperation({
		summary: 'Reject invitation',
	})
	@ApiOkResponse({
		type: Boolean,
		description: 'Отклонилось ли приглашение',
	})
	@Put('invite/reject')
	async reject(
		@Query('token') token: string,
		@CurrentUser() user: SecurityUserDto
	): Promise<boolean> {
		return this.invitationsService.reject({ token, userId: user.id, });
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
