import {
	Controller,
	Get,
	Param,
	UseGuards,
	ParseIntPipe,
	Post,
	Body,
	Put,
	Delete,
	HttpStatus,
	NotFoundException,
	UnauthorizedException,
} from '@nestjs/common';
import {
	ApiBearerAuth,
	ApiBody,
	ApiOperation,
	ApiParam,
	ApiResponse,
	ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@/auth/auth.guard';
import { Room } from './models';
import { RoomsService } from './rooms.service';
import { AuthService } from '@/auth/auth.service';
import { CreateRoomDto, UpdateRoomDto } from './dto';
import { AuthToken } from '@/decorators/auth-token.decorator';

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
	@ApiBearerAuth()
	@ApiResponse({
		status: HttpStatus.OK,
		type: Room,
		isArray: true,
	})
	@ApiResponse({
		status: HttpStatus.UNAUTHORIZED,
		type: UnauthorizedException,
	})
	@UseGuards(AuthGuard)
	@Get('/')
	async getRooms(@AuthToken() token: string): Promise<Room[]> {
		const { userId } = await this.authService.verifyUser(token);
		return this.roomsService.getRooms(userId);
	}

	@ApiOperation({
		summary: 'Возврат комнаты',
	})
	@ApiParam({
		name: 'roomId',
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
	@Get('/:roomId')
	async getRoom(@Param('roomId', ParseIntPipe) roomId: number): Promise<Room> {
		return this.roomsService.getRoom(roomId);
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
	@ApiResponse({
		status: HttpStatus.UNAUTHORIZED,
		type: UnauthorizedException,
	})
	@ApiBearerAuth()
	@UseGuards(AuthGuard)
	@Post('/create')
	async createRoom(
		@AuthToken() token: string,
		@Body() dto: CreateRoomDto
	): Promise<Room> {
		const { userId } = await this.authService.verifyUser(token);
		return this.roomsService.createRoom(userId, dto);
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
	@ApiResponse({
		status: HttpStatus.UNAUTHORIZED,
		type: UnauthorizedException,
	})
	@ApiBearerAuth()
	@UseGuards(AuthGuard)
	@Put('/:roomId/update')
	async updateRoom(
		@Param('roomId', ParseIntPipe) roomId: number,
		@Body() dto: UpdateRoomDto
	): Promise<Room> {
		return this.roomsService.updateRoom(roomId, dto);
	}

	@ApiOperation({
		summary: 'Удаление комнаты',
	})
	@ApiResponse({
		status: HttpStatus.OK,
		type: undefined,
	})
	@ApiBearerAuth()
	@UseGuards(AuthGuard)
	@Delete('/:roomId/delete')
	async deleteRoom(
		@Param('roomId', ParseIntPipe) roomId: number
	): Promise<boolean> {
		return this.roomsService.deleteRoom(roomId);
	}
}
