import {
	Controller,
	Get,
	Put,
	Delete,
	HttpStatus,
	NotFoundException,
	CacheInterceptor,
	UseInterceptors,
	Param,
	Query
} from '@nestjs/common';
import {
	ApiConflictResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiParam,
	ApiQuery,
	ApiTags
} from '@nestjs/swagger';
import { Auth, CurrentUser } from '@/auth';
import { SecurityUserDto } from '@/users';
import { IntParam } from '@/shared';
import { IsOwner } from '@/rooms/lib';
import { IsMember } from '../lib';
import { MembersService, MembersTokensService } from '../services';

@ApiTags('Пользователи комнаты')
@Auth()
@Controller('members/:roomId')
export class MembersController {
	constructor(
		private readonly roomUserService: MembersService,
		private readonly roomTokensService: MembersTokensService
	) {}

	@ApiOperation({
		summary: 'Получение всех пользователей комнаты',
	})
	@ApiOkResponse({
		type: SecurityUserDto,
		isArray: true,
		description: 'Пользователи комнаты',
	})
	@ApiNotFoundResponse({
		status: HttpStatus.NOT_FOUND,
		type: NotFoundException,
		description: 'Такой комнаты не существует',
	})
	@UseInterceptors(CacheInterceptor)
	@Get('')
	async getUsers(
		@IntParam('roomId') roomId: number
	): Promise<SecurityUserDto[]> {
		return this.roomUserService.getUsers({ roomId, });
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
	@Get('invited')
	async getInvitations(
		@IntParam('roomId') roomId: number
	): Promise<SecurityUserDto[]> {
		return this.roomUserService.getInvitations({ roomId, });
	}

	@ApiOperation({
		summary: 'Отсылает пользователю приглашения присоединиться',
	})
	@ApiOkResponse({
		type: SecurityUserDto,
		description: 'Добавленный пользователь',
	})
	@IsOwner()
	@Put('/:userId')
	async invite(
		@IntParam('roomId') roomId: number,
		@IntParam('userId') userId: number
	): Promise<SecurityUserDto> {
		return this.roomUserService.inviteUser({ userId, roomId, });
	}

	@ApiOperation({
		summary: 'Генерация ссылки для приглашения в комнату',
	})
	@ApiOkResponse({
		type: String,
		description: 'Hash дял добавления',
	})
	@IsOwner()
	@IsMember()
	@Get('/generate-link')
	async generateInviteHash(
		@IntParam('roomId') roomId: number
	): Promise<string> {
		return this.roomTokensService.generateLinkToken({ roomId, });
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
	@Put('/invite/approve')
	async approveInvite(
		@Query('token') token: string,
		@CurrentUser() user: SecurityUserDto
	): Promise<SecurityUserDto> {
		return this.roomUserService.approveInvite({ token, userId: user.id, });
	}

	@ApiOperation({
		summary: 'Отклонение добавления в комнату',
	})
	@ApiOkResponse({
		type: Boolean,
		description: 'Удалось ли отклонить приглашение',
	})
	@Put('/invite/reject')
	async rejectInvite(
		@Query('token') token: string,
		@CurrentUser() user: SecurityUserDto
	): Promise<boolean> {
		return this.roomUserService.rejectInvite({ token, userId: user.id, });
	}

	@ApiOperation({
		summary: 'Добавление пользователя по ссылке',
	})
	@ApiParam({
		type: String,
		name: 'hash',
	})
	@ApiParam({
		type: Number,
		name: 'id',
	})
	@ApiOkResponse({
		type: Boolean,
		description: 'Удалось ли войти в комнату',
	})
	@ApiConflictResponse({
		description: 'Пользователь уже вошел или не был ',
	})
	@Auth()
	@Put('/invite/:token')
	async addUserViaLink(
		@Param('token') token: string,
		@CurrentUser() user: SecurityUserDto
	): Promise<SecurityUserDto> {
		return this.roomUserService.addUserViaLink({
			token,
			userId: user.id,
		});
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
		await this.roomUserService.removeUser({ roomId, userId, });

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
		return this.roomUserService.removeUser({ roomId, userId, });
	}
}
