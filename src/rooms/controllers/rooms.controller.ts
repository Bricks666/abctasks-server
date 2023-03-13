import {
	Controller,
	Get,
	Post,
	Body,
	Put,
	Delete,
	CacheInterceptor,
	UseInterceptors
} from '@nestjs/common';
import {
	ApiBody,
	ApiCreatedResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiParam,
	ApiTags
} from '@nestjs/swagger';
import { Auth, CurrentUser, DisableAuthCheck } from '@/auth';
import { SecurityUserDto } from '@/users';
import { IntParam } from '@/shared';
import { RoomsService } from '../services';
import { CreateRoomDto, RoomDto, UpdateRoomDto } from '../dto';
import { IsOwner } from '../lib';
import { WithRights } from '../types';

@ApiTags('Комнаты')
@Controller('rooms')
export class RoomsController {
	constructor(private readonly roomsService: RoomsService) {}

	@ApiOperation({
		summary: 'Возврат всех комнат авторизованного пользователя',
	})
	@ApiOkResponse({
		type: RoomDto,
		isArray: true,
		description: 'Все комнаты, в которых состоит пользователь',
	})
	@Auth()
	@UseInterceptors(CacheInterceptor)
	@Get('/')
	async getAll(
		@CurrentUser() user: SecurityUserDto
	): Promise<WithRights<RoomDto>[]> {
		const { id, } = user;
		return this.roomsService.getAll({ userId: id, });
	}

	@ApiOperation({
		summary: 'Возврат комнаты',
	})
	@ApiParam({
		name: 'id',
		type: Number,
	})
	@ApiOkResponse({
		type: RoomDto,
	})
	@ApiNotFoundResponse()
	@Auth()
	@DisableAuthCheck()
	@UseInterceptors(CacheInterceptor)
	@Get('/:id')
	async getOne(
		@IntParam('id') id: number,
		@CurrentUser() user: SecurityUserDto
	): Promise<WithRights<RoomDto>> {
		const { id: userId, } = user;
		return this.roomsService.getOne({ id, userId, });
	}

	@ApiOperation({
		summary: 'Создание комнаты',
	})
	@ApiBody({
		description: 'Имя и описание комнаты',
		type: CreateRoomDto,
	})
	@ApiCreatedResponse({
		type: RoomDto,
	})
	@Auth()
	@Post('/create')
	async create(
		@CurrentUser() user: SecurityUserDto,
		@Body() body: CreateRoomDto
	): Promise<WithRights<RoomDto>> {
		const { id: userId, } = user;
		return this.roomsService.create({
			...body,
			userId,
		});
	}

	@ApiOperation({
		summary: 'Изменение комнаты',
	})
	@ApiBody({
		description: 'Имя и описание комнаты',
		type: UpdateRoomDto,
	})
	@ApiOkResponse({
		type: RoomDto,
		description: 'Обновленная комната',
	})
	@IsOwner()
	@Auth()
	@Put('/:id/update')
	async update(
		@CurrentUser() user: SecurityUserDto,
		@IntParam('id') id: number,
		@Body() body: UpdateRoomDto
	): Promise<WithRights<RoomDto>> {
		const { id: userId, } = user;

		return this.roomsService.update({ ...body, id, userId, });
	}

	@ApiOperation({
		summary: 'Удаление комнаты',
	})
	@ApiOkResponse({
		type: Boolean,
		description: 'Удалось ли выполнить удаление комнаты',
	})
	@IsOwner()
	@Auth()
	@Delete('/:id/remove')
	async remove(@IntParam('id') id: number): Promise<boolean> {
		return this.roomsService.remove({ id, });
	}
}
