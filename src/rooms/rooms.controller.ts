import {
	Controller,
	Get,
	Param,
	ParseIntPipe,
	Post,
	Body,
	Put,
	Delete,
	HttpStatus,
	NotFoundException,
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
import { RoomsService } from './rooms.service';
import { CreateRoomDto, RoomDto, RoomUserDto, UpdateRoomDto } from './dto';
import { Auth } from '@/auth/auth.decorator';
import { SecurityUserDto } from '@/users/dto';
import { InRoom } from './in-room.decorator';
import { User } from '@/common';

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
	@Auth()
	@UseInterceptors(CacheInterceptor)
	@Get('/:id/users')
	async getUsers(@Param('id', ParseIntPipe) id: number) {
		return this.roomsService.getUsers({ id, });
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
	@Auth()
	@InRoom()
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
		summary: 'Добавление пользователя в комнату',
	})
	@ApiBody({
		description: 'Id пользователя для добавления',
		type: RoomUserDto,
	})
	@ApiOkResponse({
		type: SecurityUserDto,
		description: 'Добавленный пользователь',
	})
	@Auth()
	@InRoom()
	@Put('/:id/add-user')
	async addUser(
		@Param('id', ParseIntPipe) id: number,
		@Body() body: RoomUserDto
	): Promise<SecurityUserDto> {
		return this.roomsService.addUser({ ...body, id, });
	}

	@ApiOperation({
		summary: 'Выход текущего пользователя из комнаты',
	})
	@ApiOkResponse({
		type: Boolean,
		description: 'Удалось ли выйти',
	})
	@Auth()
	@InRoom()
	@Put('/:id/exit')
	async removeUser(
		@Param('id', ParseIntPipe) id: number,
		@User() user: SecurityUserDto
	) {
		const { id: userId, } = user;
		return this.roomsService.removeUser({ id, userId, });
	}

	@ApiOperation({
		summary: 'Удаление комнаты',
	})
	@ApiOkResponse({
		type: Boolean,
		description: 'Удалось ли выполнить удаление комнаты',
	})
	@Auth()
	@InRoom()
	@Delete('/:id/remove')
	async remove(@Param('id', ParseIntPipe) id: number): Promise<boolean> {
		return this.roomsService.remove({ id, });
	}
}
