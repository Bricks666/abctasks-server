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
	CacheInterceptor,
	UseInterceptors,
	Query
} from '@nestjs/common';
import {
	ApiOperation,
	ApiParam,
	ApiBody,
	ApiTags,
	ApiOkResponse,
	ApiNotFoundResponse,
	ApiCreatedResponse
} from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { CreateTaskDto, TaskDto, UpdateTaskDto, GetTasksDto } from './dto';
import { ActivitiesService } from '@/activities/activities.service';
import { Auth } from '@/auth/auth.decorator';
import { InRoom } from '@/rooms';
import { User } from '@/common';
import { SecurityUserDto } from '@/users/dto';

@ApiTags('Задачи')
@Controller('tasks')
export class TasksController {
	constructor(
		private readonly tasksService: TasksService,
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
	@ApiOkResponse({
		type: TaskDto,
		isArray: true,
	})
	@UseInterceptors(CacheInterceptor)
	@Get('/:roomId')
	async getAll(
		@Param('roomId', ParseIntPipe) roomId: number,
		@Query() query: GetTasksDto
	): Promise<TaskDto[]> {
		return this.tasksService.getAll({ roomId, ...query, });
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
	@ApiOkResponse({
		type: TaskDto,
	})
	@ApiNotFoundResponse()
	@UseInterceptors(CacheInterceptor)
	@Get('/:roomId/:id')
	async getOne(
		@Param('roomId', ParseIntPipe) roomId: number,
		@Param('id', ParseIntPipe) id: number
	): Promise<TaskDto> {
		return this.tasksService.getOne({ roomId, id, });
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
	@ApiCreatedResponse({
		type: TaskDto,
		description: 'Созданная задача',
	})
	@InRoom()
	@Auth()
	@Post('/:roomId/create')
	async create(
		@Param('roomId', ParseIntPipe) roomId: number,
		@User() user: SecurityUserDto,
		@Body() body: CreateTaskDto
	): Promise<TaskDto> {
		const { id: authorId, } = user;

		const task = await this.tasksService.create({
			roomId,
			authorId,
			...body,
		});

		await this.activitiesService.create({
			roomId,
			activistId: authorId,
			sphereName: 'task',
			action: 'create',
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
	@ApiOkResponse({
		status: HttpStatus.OK,
		type: TaskDto,
		description: 'Измененная задача',
	})
	@ApiNotFoundResponse({
		description: 'Такой задачи не существует',
	})
	@InRoom()
	@Auth()
	@Put('/:roomId/:id/update')
	async update(
		@Param('roomId', ParseIntPipe) roomId: number,
		@Param('id', ParseIntPipe) id: number,
		@User() user: SecurityUserDto,
		@Body() body: UpdateTaskDto
	): Promise<TaskDto> {
		const { id: userId, } = user;

		const task = await this.tasksService.update({ roomId, id, ...body, });

		await this.activitiesService.create({
			roomId,
			activistId: userId,
			sphereName: 'task',
			action: 'update',
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
	@ApiOkResponse({
		type: Boolean,
		description: 'Удались ли удалить задачу',
	})
	@InRoom()
	@Auth()
	@Delete('/:roomId/:id/remove')
	async remove(
		@Param('roomId', ParseIntPipe) roomId: number,
		@Param('id', ParseIntPipe) id: number,
		@User() user: SecurityUserDto
	): Promise<boolean> {
		const { id: userId, } = user;

		const response = await this.tasksService.remove({ roomId, id, });

		await this.activitiesService.create({
			roomId,
			activistId: userId,
			sphereName: 'task',
			action: 'remove',
		});

		return response;
	}
}
