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
	ApiOperation,
	ApiParam,
	ApiResponse,
	ApiTags
} from '@nestjs/swagger';
import { Room } from './models';
import { RoomsService } from './rooms.service';
import { AuthService } from '@/auth/auth.service';
import { CreateRoomDto, RoomUserDto, UpdateRoomDto } from './dto';
import { AuthToken } from '@/decorators/auth-token.decorator';
import { Auth } from '@/decorators/auth.decorator';

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
		type: Room,
		isArray: true,
	})
	@Auth()
	@UseInterceptors(CacheInterceptor)
	@Get('/')
	async getAll(@AuthToken() token: string): Promise<Room[]> {
		const { id, } = await this.authService.verifyUser(token);
		return this.roomsService.getAll(id);
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
		type: Room,
	})
	@ApiResponse({
		status: HttpStatus.NOT_FOUND,
		type: NotFoundException,
	})
	@UseInterceptors(CacheInterceptor)
	@Get('/:id')
	async getOne(@Param('id', ParseIntPipe) id: number): Promise<Room> {
		return this.roomsService.getOne(id);
	}

	@UseInterceptors(CacheInterceptor)
	@Get('/:id/users')
	async getUsers(@Param('id', ParseIntPipe) id: number) {
		return this.roomsService.getUsers(id);
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
		type: Room,
	})
	@ApiResponse({
		status: HttpStatus.NOT_FOUND,
		type: NotFoundException,
	})
	@Auth()
	@Post('/create')
	async create(
		@AuthToken() token: string,
		@Body() dto: CreateRoomDto
	): Promise<Room> {
		const { id, } = await this.authService.verifyUser(token);
		return this.roomsService.create(id, dto);
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
		type: Room,
	})
	@ApiResponse({
		status: HttpStatus.NOT_FOUND,
		type: NotFoundException,
	})
	@Auth()
	@Put('/:id/update')
	async update(
		@Param('id', ParseIntPipe) id: number,
		@Body() dto: UpdateRoomDto
	): Promise<Room> {
		return this.roomsService.update(id, dto);
	}

	@Auth()
	@Put('/:id/add-user')
	async addUser(
		@Param('id', ParseIntPipe) id: number,
		@Body() dto: RoomUserDto
	) {
		return this.roomsService.addUser(id, dto);
	}

	@Auth()
	@Put('/:id/exit')
	async removeUser(
		@Param('id', ParseIntPipe) id: number,
		@AuthToken() token: string
	) {
		const { id: userId, } = await this.authService.verifyUser(token);
		return this.roomsService.removeUser(id, { userId, });
	}

	@ApiOperation({
		summary: 'Удаление комнаты',
	})
	@ApiResponse({
		status: HttpStatus.OK,
		type: undefined,
	})
	@Auth()
	@Delete('/:id/remove')
	async remove(@Param('id', ParseIntPipe) id: number): Promise<boolean> {
		return this.roomsService.remove(id);
	}
}
