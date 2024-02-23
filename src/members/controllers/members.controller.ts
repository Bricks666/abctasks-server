import {
	Controller,
	Get,
	Delete,
	NotFoundException,
	UseInterceptors
} from '@nestjs/common';
import {
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiTags
} from '@nestjs/swagger';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { Auth, CurrentUser } from '@/auth/lib';
import { SecurityUserDto } from '@/users/dto';
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
		return this.membersService.getMembers({ roomId, });
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
		await this.membersService.exit({ roomId, userId, });

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
