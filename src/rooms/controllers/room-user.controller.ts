import {
	Controller,
	Get,
	Put,
	Delete,
	HttpStatus,
	NotFoundException,
	CacheInterceptor,
	UseInterceptors
} from '@nestjs/common';
import {
	ApiConflictResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiParam,
	ApiTags
} from '@nestjs/swagger';
import { Auth, CurrentUser, DisableAuthCheck } from '@/auth';
import { SecurityUserDto } from '@/users';
import { IntParam } from '@/shared';
import { RoomUserService } from '../services';
import { InRoom, IsOwner } from '../lib';

@ApiTags('Пользователи комнаты')
@Controller('rooms/:id/members')
export class RoomUserController {
	constructor(private readonly roomUserService: RoomUserService) {}

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
	@DisableAuthCheck()
	@UseInterceptors(CacheInterceptor)
	@Get('')
	async getUsers(@IntParam('id') id: number): Promise<SecurityUserDto[]> {
		return this.roomUserService.getUsers({ roomId: id, });
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
	@DisableAuthCheck()
	@Get('invited')
	async getInvitations(
		@IntParam('id') roomId: number
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
	@Auth()
	@Put('/:userId')
	async invite(
		@IntParam('id') id: number,
		@IntParam('userId') userId: number
	): Promise<SecurityUserDto> {
		return this.roomUserService.inviteUser({ userId, roomId: id, });
	}

	@ApiOperation({
		summary: 'Генерация ссылки для приглашения человека в комнату',
	})
	@ApiOkResponse({
		type: String,
		description: 'Hash дял добавления',
	})
	@InRoom()
	@Auth()
	@Get('/link-hash')
	async generateInviteHash(@IntParam('id') id: number): Promise<string> {
		return this.roomUserService.generateInviteHash({ roomId: id, });
	}

	@ApiOperation({
		summary: 'Принятие приглашения в комнату',
	})
	@ApiOkResponse({
		type: SecurityUserDto,
		description: 'Добавленный пользователь',
	})
	@Auth()
	@Put('/invite/approve')
	async approveInvite(
		@IntParam('id') id: number,
		@CurrentUser() user: SecurityUserDto
	): Promise<SecurityUserDto> {
		return this.roomUserService.approveInvite({ roomId: id, userId: user.id, });
	}

	@ApiOperation({
		summary: 'Отклонение добавления в комнату',
	})
	@ApiOkResponse({
		type: Boolean,
		description: 'Удалось ли отклонить приглашение',
	})
	@Auth()
	@Put('/invite/reject')
	async rejectInvite(
		@IntParam('id') id: number,
		@CurrentUser() user: SecurityUserDto
	): Promise<boolean> {
		return this.roomUserService.rejectInvite({ roomId: id, userId: user.id, });
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
	@Put('/invite/:hash')
	async addUserByLink(
		@IntParam('hash') hash: string,
		@CurrentUser() user: SecurityUserDto
	): Promise<SecurityUserDto> {
		return this.roomUserService.addUserByLink({
			hash,
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
	@InRoom()
	@Auth()
	@Delete('/exit')
	async exit(
		@IntParam('id') id: number,
		@CurrentUser() user: SecurityUserDto
	): Promise<boolean> {
		const { id: userId, } = user;
		await this.roomUserService.removeUser({ roomId: id, userId, });

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
	@Auth()
	@Delete('/remove/:userId')
	async removeUser(
		@IntParam('id') id: number,
		@IntParam('userId') userId: number
	): Promise<boolean> {
		return this.roomUserService.removeUser({ roomId: id, userId, });
	}
}
