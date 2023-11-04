import {
	Controller,
	Get,
	Put,
	Delete,
	NotFoundException,
	CacheInterceptor,
	UseInterceptors,
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
import { IsOwner } from '@/rooms/lib';
import { IsMember } from '../lib';
import { MembersService } from '../services';

@ApiTags('Пользователи комнаты')
@Auth()
@Controller('members/:roomId')
export class MembersController {
	constructor(private readonly membersService: MembersService) {}

	@ApiOperation({
		summary: 'Получение всех пользователей комнаты',
	})
	@ApiOkResponse({
		type: SecurityUserDto,
		isArray: true,
		description: 'Пользователи комнаты',
	})
	@ApiNotFoundResponse({
		type: NotFoundException,
		description: 'Такой комнаты не существует',
	})
	@UseInterceptors(CacheInterceptor)
	@Get('/')
	async getUsers(
		@IntParam('roomId') roomId: number
	): Promise<SecurityUserDto[]> {
		return this.membersService.getUsers({ roomId, });
	}

	@ApiOperation({
		summary:
			'Возвращает всех приглашенных, но не ответивших на приглашение пользователей',
	})
	@ApiOkResponse({
		type: SecurityUserDto,
		isArray: true,
	})
	@ApiNotFoundResponse({
		description: 'Такой комнаты не существует',
	})
	@Get('/invited')
	async getInvitations(
		@IntParam('roomId') roomId: number
	): Promise<SecurityUserDto[]> {
		return this.membersService.getInvited({ roomId, });
	}

	@ApiOperation({
		summary: 'Генерация ссылки для приглашения в комнату',
	})
	@ApiOkResponse({
		type: String,
		description: 'Hash дял добавления',
	})
	@IsOwner()
	@Get('/invite/generate-link')
	async generateInviteLink(
		@IntParam('roomId') roomId: number
	): Promise<string> {
		return this.membersService.generateInvitationLink({ roomId, });
	}

	@ApiOperation({
		summary: 'Отсылает пользователю приглашения присоединиться',
	})
	@ApiOkResponse({
		type: SecurityUserDto,
		description: 'Добавленный пользователь',
	})
	@IsOwner()
	@Put('/invite/:userId')
	async invite(
		@IntParam('roomId') roomId: number,
		@IntParam('userId') userId: number
	): Promise<SecurityUserDto> {
		return this.membersService.inviteUser({ userId, roomId, });
	}

	@ApiOperation({
		summary: 'Принятие приглашения в комнату',
	})
	@ApiOkResponse({
		type: SecurityUserDto,
		description: 'Добавленный пользователь',
	})
	@ApiQuery({
		name: 'token',
		type: String,
		description: 'Invitation token from email or link',
	})
	@Put('/invitation/approve')
	async approveInvite(
		@Query('token') token: string,
		@CurrentUser() user: SecurityUserDto
	): Promise<SecurityUserDto> {
		return this.membersService.approveInvitation({ token, userId: user.id, });
	}

	@ApiOperation({
		summary: 'Отклонение добавления в комнату',
	})
	@ApiOkResponse({
		type: Boolean,
		description: 'Удалось ли отклонить приглашение',
	})
	@Put('/invitation/reject')
	async rejectInvite(
		@Query('token') token: string,
		@CurrentUser() user: SecurityUserDto
	): Promise<boolean> {
		return this.membersService.rejectInvitation({ token, userId: user.id, });
	}

	@ApiOperation({
		summary: 'Выход текущего пользователя из комнаты',
	})
	@ApiOkResponse({
		type: Boolean,
		description: 'Удалось ли выйти',
	})
	@IsMember()
	@Delete('/exit')
	async exit(
		@IntParam('roomId') roomId: number,
		@CurrentUser() user: SecurityUserDto
	): Promise<boolean> {
		const { id: userId, } = user;
		await this.membersService.removeUser({ roomId, userId, });

		return true;
	}

	@ApiOperation({
		summary: 'Удаление пользователя из комнаты',
	})
	@ApiOkResponse({
		type: Boolean,
		description: 'Удалось ли удалить пользователя',
	})
	@IsOwner()
	@Delete('/remove/:userId')
	async removeUser(
		@IntParam('roomId') roomId: number,
		@IntParam('userId') userId: number
	): Promise<boolean> {
		return this.membersService.removeUser({ roomId, userId, });
	}
}
