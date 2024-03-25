import {
	Controller,
	Get,
	Post,
	Body,
	Put,
	Delete,
	UseInterceptors,
	Inject
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
import { CACHE_MANAGER, Cache, CacheInterceptor } from '@nestjs/cache-manager';
import { Auth, CurrentUser } from '@/auth/lib';
import { SecurityUserDto } from '@/users/dto';
import { IntParam } from '@/shared';
import { IsMember } from '@/members/lib';
import { RoomsService } from '../services';
import { CreateRoomDto, RoomDto, UpdateRoomDto } from '../dto';
import { IsOwner } from '../lib';
import { WithRights } from '../types';
import { getUserRoomsCacheKey } from './lib';

@ApiTags('Комнаты')
@Controller('rooms')
@Auth()
export class RoomsController {
	constructor(
		private readonly roomsService: RoomsService,
		@Inject(CACHE_MANAGER) private readonly cacheManager: Cache
	) {}

	@ApiOperation({
		summary: 'Возврат всех комнат авторизованного пользователя',
	})
	@ApiOkResponse({
		type: RoomDto,
		isArray: true,
		description: 'Все комнаты, в которых состоит пользователь',
	})
	@Get('/')
	async getAll(
		@CurrentUser() user: SecurityUserDto
	): Promise<WithRights<RoomDto>[]> {
		const { id, } = user;

		const cacheKey = getUserRoomsCacheKey(id);

		let rooms = await this.cacheManager.get<WithRights<RoomDto>[]>(cacheKey);

		if (rooms) {
			return rooms;
		}

		rooms = await this.roomsService.getAll({ userId: id, });

		await this.cacheManager.set(cacheKey, rooms, +process.env.CACHE_TTL);

		return rooms;
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
	@IsMember()
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
	@Delete('/:id/remove')
	async remove(@IntParam('id') id: number): Promise<boolean> {
		return this.roomsService.remove({ id, });
	}
}
