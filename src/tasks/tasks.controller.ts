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
} from '@nestjs/common';
import {
	ApiOperation,
	ApiResponse,
	ApiParam,
	ApiBody,
	ApiTags,
} from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { Task } from './models';
import { AuthToken } from '@/decorators/auth-token.decorator';
import { CreateTaskDto, UpdateTaskDto } from './dto';
import { AuthService } from '@/auth/auth.service';
import { ActivitiesService } from '@/activities/activities.service';
import { Auth } from '@/decorators/auth.decorator';

@ApiTags('Задачи')
@Controller('tasks')
export class TasksController {
	constructor(
		private readonly tasksService: TasksService,
		private readonly authService: AuthService,
		private readonly activitiesService: ActivitiesService
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
	})
	@Auth()
	@Post('/:roomId/create')
	async create(
		@Param('roomId', ParseIntPipe) roomId: number,
		@AuthToken() token: string,
		@Body() dto: CreateTaskDto
	): Promise<Task> {
		const { id: userId } = await this.authService.verifyUser(token);
		const task = await this.tasksService.create(roomId, userId, dto);
		await this.activitiesService.create(roomId, {
			activistId: userId,
			sphere: 'task',
			type: 'create',
		});
		return task;
	}

	@ApiOperation({
		summary: 'Изменение информации о комнате',
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
	})
	@ApiResponse({
		status: HttpStatus.NOT_FOUND,
		type: NotFoundException,
	})
	@Auth()
	@Put('/:roomId/:id/update')
	async update(
		@Param('roomId', ParseIntPipe) roomId: number,
		@Param('id', ParseIntPipe) id: number,
		@Body() dto: UpdateTaskDto,
		@AuthToken() token: string
	): Promise<Task> {
		const { id: userId } = await this.authService.verifyUser(token);
		const task = await this.tasksService.update(roomId, id, dto);
		await this.activitiesService.create(roomId, {
			activistId: userId,
			sphere: 'task',
			type: 'update',
		});
		return task;
	}

	@ApiOperation({
		summary: 'Изменение информации о комнате',
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
		type: undefined,
	})
	@Auth()
	@Delete('/:roomId/:id/remove')
	async remove(
		@Param('roomId', ParseIntPipe) roomId: number,
		@Param('id', ParseIntPipe) id: number,
		@AuthToken() token: string
	): Promise<boolean> {
		const { id: userId } = await this.authService.verifyUser(token);
		const response = await this.tasksService.remove(roomId, id);
		await this.activitiesService.create(roomId, {
			activistId: userId,
			sphere: 'task',
			type: 'remove',
		});
		return response;
	}
}
