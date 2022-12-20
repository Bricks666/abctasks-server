import {
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	ParseIntPipe,
	Body,
	HttpStatus,
	NotFoundException,
	CacheInterceptor,
	UseInterceptors,
	ForbiddenException
} from '@nestjs/common';
import {
	ApiOperation,
	ApiResponse,
	ApiParam,
	ApiBody,
	ApiTags
} from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { Task } from './models';
import { AuthToken } from '@/decorators/auth-token.decorator';
import { CreateTaskDto, UpdateTaskDto } from './dto';
import { AuthService } from '@/auth/auth.service';
import { ActivitiesService } from '@/activities/activities.service';
import { Auth } from '@/decorators/auth.decorator';
import { RoomsService } from '@/rooms/rooms.service';

@ApiTags('Задачи')
@Controller('tasks')
export class TasksController {
	constructor(
		private readonly tasksService: TasksService,
		private readonly authService: AuthService,
		private readonly activitiesService: ActivitiesService,
		private readonly roomsService: RoomsService
	) {}

	@ApiOperation({
		summary: 'Получение всех задач в комнате',
	})
	@ApiParam({
		name: 'roomId',
		type: Number,
		description: 'Id комнаты',
	})
	@ApiResponse({
		status: HttpStatus.OK,
		type: Task,
		isArray: true,
	})
	@UseInterceptors(CacheInterceptor)
	@Get('/:roomId')
	async getAll(@Param('roomId', ParseIntPipe) roomId: number): Promise<Task[]> {
		return this.tasksService.getAll(roomId);
	}

	@ApiOperation({
		summary: 'Получение задачи из комнате',
	})
	@ApiParam({
		name: 'roomId',
		type: Number,
		description: 'Id комнаты',
	})
	@ApiParam({
		name: 'id',
		type: Number,
		description: 'Id задачи',
	})
	@ApiResponse({
		status: HttpStatus.OK,
		type: Task,
	})
	@ApiResponse({
		status: HttpStatus.NOT_FOUND,
		type: NotFoundException,
	})
	@UseInterceptors(CacheInterceptor)
	@Get('/:roomId/:id')
	async getOne(
		@Param('roomId', ParseIntPipe) roomId: number,
		@Param('id', ParseIntPipe) id: number
	): Promise<Task> {
		return this.tasksService.getOne(roomId, id);
	}

	@ApiOperation({
		summary: 'Создание новой задачи',
	})
	@ApiParam({
		name: 'roomId',
		type: Number,
		description: 'Id комнаты',
	})
	@ApiBody({
		type: CreateTaskDto,
		description: 'Тело новой задачи',
	})
	@ApiResponse({
		status: HttpStatus.OK,
		type: Task,
		description: 'Обновленная задача',
	})
	@ApiResponse({
		status: HttpStatus.FORBIDDEN,
		type: ForbiddenException,
		description: 'Пользователь не может совершать действия в данной комнате',
	})
	@Auth()
	@Post('/:roomId/create')
	async create(
		@Param('roomId', ParseIntPipe) roomId: number,
		@AuthToken() token: string,
		@Body() dto: CreateTaskDto
	): Promise<Task> {
		const { id: userId, } = await this.authService.verifyUser(token);
		const roomExistsUser = await this.roomsService.roomExistsUser(
			roomId,
			userId
		);
		if (!roomExistsUser) {
			throw new ForbiddenException('You dont have access');
		}
		const task = await this.tasksService.create(roomId, userId, dto);
		await this.activitiesService.create(roomId, {
			activistId: userId,
			sphere: 'task',
			type: 'create',
		});
		return task;
	}

	@ApiOperation({
		summary: 'Изменение задачи',
	})
	@ApiParam({
		name: 'roomId',
		type: Number,
		description: 'Id комнаты',
	})
	@ApiParam({
		name: 'id',
		type: Number,
		description: 'Id задачи',
	})
	@ApiBody({
		type: UpdateTaskDto,
		description: 'Новые данные задачи',
	})
	@ApiResponse({
		status: HttpStatus.OK,
		type: Task,
		description: 'Измененная задача',
	})
	@ApiResponse({
		status: HttpStatus.NOT_FOUND,
		type: NotFoundException,
		description: 'Такой задачи не существует',
	})
	@ApiResponse({
		status: HttpStatus.FORBIDDEN,
		type: ForbiddenException,
		description: 'Пользователь не может совершать действия в данной комнате',
	})
	@Auth()
	@Put('/:roomId/:id/update')
	async update(
		@Param('roomId', ParseIntPipe) roomId: number,
		@Param('id', ParseIntPipe) id: number,
		@Body() dto: UpdateTaskDto,
		@AuthToken() token: string
	): Promise<Task> {
		const { id: userId, } = await this.authService.verifyUser(token);
		const roomExistsUser = await this.roomsService.roomExistsUser(
			roomId,
			userId
		);
		if (!roomExistsUser) {
			throw new ForbiddenException('You dont have access');
		}
		const task = await this.tasksService.update(roomId, id, dto);
		await this.activitiesService.create(roomId, {
			activistId: userId,
			sphere: 'task',
			type: 'update',
		});
		return task;
	}

	@ApiOperation({
		summary: 'Удаление задачи',
	})
	@ApiParam({
		name: 'roomId',
		type: Number,
		description: 'Id комнаты',
	})
	@ApiParam({
		name: 'id',
		type: Number,
		description: 'Id задачи',
	})
	@ApiResponse({
		status: HttpStatus.OK,
		type: Boolean,
		description: 'Удались ли удалить задачу',
	})
	@ApiResponse({
		status: HttpStatus.FORBIDDEN,
		type: ForbiddenException,
		description: 'Пользователь не может совершать действия в данной комнате',
	})
	@Auth()
	@Delete('/:roomId/:id/remove')
	async remove(
		@Param('roomId', ParseIntPipe) roomId: number,
		@Param('id', ParseIntPipe) id: number,
		@AuthToken() token: string
	): Promise<boolean> {
		const { id: userId, } = await this.authService.verifyUser(token);
		const roomExistsUser = await this.roomsService.roomExistsUser(
			roomId,
			userId
		);
		if (!roomExistsUser) {
			throw new ForbiddenException('You dont have access');
		}
		const response = await this.tasksService.remove(roomId, id);
		await this.activitiesService.create(roomId, {
			activistId: userId,
			sphere: 'task',
			type: 'remove',
		});
		return response;
	}
}
