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
import { JwtService } from '@nestjs/jwt';
import { RoomsService } from './rooms.service';
import { CreateRoomDto, RoomDto, UpdateRoomDto } from './dto';
import { Auth } from '@/auth/auth.decorator';
import { SecurityUserDto } from '@/users/dto';
import { InRoom, IsOwner } from './lib';
import { User } from '@/common';

@ApiTags('Комнаты')
@Controller('rooms')
export class RoomsController {
	constructor(
		private readonly roomsService: RoomsService,
		private readonly jwtService: JwtService
	) {}

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
	@InRoom()
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
	@InRoom()
	@Auth()
	@Delete('/:id/remove')
	async remove(@Param('id', ParseIntPipe) id: number): Promise<boolean> {
		return this.roomsService.remove({ id, });
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
	@Put('/:id/invite/:userId')
	async invite(
		@Param('id', ParseIntPipe) id: number,
		@Param('userId', ParseIntPipe) userId: number
	): Promise<SecurityUserDto> {
		return this.roomsService.inviteUser({ userId, id, });
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
	@Get('/:id/link-hash')
	async generateInviteHash(
		@Param('id', ParseIntPipe) id: number
	): Promise<string> {
		return this.roomsService.generateInviteHash({ id, });
	}

	@ApiOperation({
		summary: 'Принятие приглашения в комнату',
	})
	@ApiOkResponse({
		type: SecurityUserDto,
		description: 'Добавленный пользователь',
	})
	@Auth()
	@Put('/:id/invite/approve')
	async approveInvite(
		@Param('id', ParseIntPipe) id: number,
		@User() user: SecurityUserDto
	): Promise<SecurityUserDto> {
		return this.roomsService.approveInvite({ id, userId: user.id, });
	}

	@ApiOperation({
		summary: 'Отклонение добавления в комнату',
	})
	@ApiOkResponse({
		type: Boolean,
		description: 'Удалось ли отклонить приглашение',
	})
	@Auth()
	@Put('/:id/invite/reject')
	async rejectInvite(
		@Param('id', ParseIntPipe) id: number,
		@User() user: SecurityUserDto
	): Promise<boolean> {
		return this.roomsService.rejectInvite({ id, userId: user.id, });
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
	})
	@Auth()
	@Put(':id/invite/:hash')
	async addUserByLink(
		@Param('hash') hash: string,
		@User() user: SecurityUserDto
	): Promise<boolean> {
		const room: Pick<RoomDto, 'id'> = await this.jwtService.verifyAsync(hash, {
			secret: process.env.SECRET,
		});

		await this.roomsService.approveInvite({
			id: room.id,
			userId: user.id,
		});

		return true;
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
	@Put('/:id/exit')
	async exit(
		@Param('id', ParseIntPipe) id: number,
		@User() user: SecurityUserDto
	): Promise<boolean> {
		const { id: userId, } = user;
		await this.roomsService.removeUser({ id, userId, });

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
	@Put('/:id/remove/:userId')
	async removeUser(
		@Param('id', ParseIntPipe) id: number,
		@Param('userId', ParseIntPipe) userId: number
	): Promise<boolean> {
		return this.roomsService.removeUser({ id, userId, });
	}
}
