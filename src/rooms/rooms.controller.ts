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
	UseInterceptors,
	ForbiddenException
} from '@nestjs/common';
import {
	ApiBody,
	ApiOperation,
	ApiParam,
	ApiResponse,
	ApiTags
} from '@nestjs/swagger';
import { RoomsService } from './rooms.service';
import { AuthService } from '@/auth/auth.service';
import { CreateRoomDto, RoomDto, RoomUserDto, UpdateRoomDto } from './dto';
import { AuthToken } from '@/auth/auth-token.decorator';
import { Auth } from '@/auth/auth.decorator';
import { SecurityUserDto } from '@/users/dto';
import { InRoom } from './in-room.decorator';

@ApiTags('Комнаты')
@Controller('rooms')
export class RoomsController {
	constructor(
		private readonly roomsService: RoomsService,
		private readonly authService: AuthService
	) {}

	@ApiOperation({
		summary: 'Возврат всех комнат авторизованного пользователя',
	})
	@ApiResponse({
		status: HttpStatus.OK,
		type: RoomDto,
		isArray: true,
		description: 'Все комнаты, в которых состоит пользователь',
	})
	@Auth()
	@UseInterceptors(CacheInterceptor)
	@Get('/')
	async getAll(@AuthToken() token: string): Promise<RoomDto[]> {
		const { id, } = await this.authService.verifyUser({ token, });
		return this.roomsService.getAll({ userId: id, });
	}

	@ApiOperation({
		summary: 'Возврат комнаты',
	})
	@ApiParam({
		name: 'id',
		type: Number,
	})
	@ApiResponse({
		status: HttpStatus.OK,
		type: RoomDto,
	})
	@ApiResponse({
		status: HttpStatus.NOT_FOUND,
		type: NotFoundException,
	})
	@Auth()
	@UseInterceptors(CacheInterceptor)
	@Get('/:id')
	async getOne(
		@Param('id', ParseIntPipe) id: number,
		@AuthToken() token: string
	): Promise<RoomDto> {
		const { id: userId, } = await this.authService.verifyUser({ token, });
		return this.roomsService.getOne({ id, userId, });
	}

	@ApiOperation({
		summary: 'Получение всех пользователей комнаты',
	})
	@ApiResponse({
		status: HttpStatus.OK,
		type: SecurityUserDto,
		isArray: true,
		description: 'Пользователи комнаты',
	})
	@ApiResponse({
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
	@ApiResponse({
		status: HttpStatus.OK,
		type: RoomDto,
	})
	@ApiResponse({
		status: HttpStatus.NOT_FOUND,
		type: NotFoundException,
	})
	@Auth()
	@Post('/create')
	async create(
		@AuthToken() token: string,
		@Body() body: CreateRoomDto
	): Promise<RoomDto> {
		const { id: userId, } = await this.authService.verifyUser({ token, });
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
	@ApiResponse({
		status: HttpStatus.OK,
		type: RoomDto,
		description: 'Обновленная комната',
	})
	@ApiResponse({
		status: HttpStatus.NOT_FOUND,
		type: NotFoundException,
		description: 'Такой комнаты не существует',
	})
	@Auth()
	@InRoom()
	@Put('/:id/update')
	async update(
		@AuthToken() token: string,
		@Param('id', ParseIntPipe) id: number,
		@Body() body: UpdateRoomDto
	): Promise<RoomDto> {
		const { id: userId, } = await this.authService.verifyUser({ token, });

		return this.roomsService.update({ ...body, id, userId, });
	}

	@ApiOperation({
		summary: 'Добавление пользователя в комнату',
	})
	@ApiBody({
		description: 'Id пользователя для добавления',
		type: RoomUserDto,
	})
	@ApiResponse({
		status: HttpStatus.OK,
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
	@ApiResponse({
		status: HttpStatus.OK,
		type: Boolean,
		description: 'Удалось ли выйти',
	})
	@Auth()
	@InRoom()
	@Put('/:id/exit')
	async removeUser(
		@Param('id', ParseIntPipe) id: number,
		@AuthToken() token: string
	) {
		const { id: userId, } = await this.authService.verifyUser({ token, });
		return this.roomsService.removeUser({ id, userId, });
	}

	@ApiOperation({
		summary: 'Удаление комнаты',
	})
	@ApiResponse({
		status: HttpStatus.OK,
		type: Boolean,
		description: 'Удалось ли выполнить удаление комнаты',
	})
	@ApiResponse({
		status: HttpStatus.FORBIDDEN,
		type: ForbiddenException,
		description: 'Пользователь не может совершать действия в данной комнате',
	})
	@Auth()
	@InRoom()
	@Delete('/:id/remove')
	async remove(@Param('id', ParseIntPipe) id: number): Promise<boolean> {
		return this.roomsService.remove({ id, });
	}
}
