import {
	Controller,
	Get,
	Param,
	ParseIntPipe,
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
import { Auth } from '@/auth/auth.decorator';
import { SecurityUserDto } from '@/users/dto';
import { User } from '@/common';
import { RoomsService } from '../services';
import { CreateRoomDto, RoomDto, UpdateRoomDto } from '../dto';
import { IsOwner } from '../lib';

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
	async getAll(@User() user: SecurityUserDto): Promise<RoomDto[]> {
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
	@UseInterceptors(CacheInterceptor)
	@Get('/:id')
	async getOne(
		@Param('id', ParseIntPipe) id: number,
		@User() user: SecurityUserDto
	): Promise<RoomDto> {
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
		@User() user: SecurityUserDto,
		@Body() body: CreateRoomDto
	): Promise<RoomDto> {
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
		@User() user: SecurityUserDto,
		@Param('id', ParseIntPipe) id: number,
		@Body() body: UpdateRoomDto
	): Promise<RoomDto> {
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
	async remove(@Param('id', ParseIntPipe) id: number): Promise<boolean> {
		return this.roomsService.remove({ id, });
	}
}
