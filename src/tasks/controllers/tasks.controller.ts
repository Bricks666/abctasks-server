import {
	Controller,
	Delete,
	Get,
	Post,
	Put,
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
import {
	ActivitiesService,
	ActivitySphereCodes,
	ActivityActionCodes
} from '@/activities';
import { Auth, CurrentUser } from '@/auth/lib';
import { IsMember } from '@/members/lib';
import { IntParam } from '@/shared';
import { SecurityUserDto } from '@/users/dto';
import { CreateTaskDto, TaskDto, UpdateTaskDto, GetTasksDto } from '../dto';
import { TasksService } from '../services';

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
		@IntParam('roomId') roomId: number,
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
		@IntParam('roomId') roomId: number,
		@IntParam('id') id: number
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
	@IsMember()
	@Auth()
	@Post('/:roomId/create')
	async create(
		@IntParam('roomId') roomId: number,
		@CurrentUser() user: SecurityUserDto,
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
			sphereName: ActivitySphereCodes.TASK,
			actionName: ActivityActionCodes.CREATE,
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
	@IsMember()
	@Auth()
	@Put('/:roomId/:id/update')
	async update(
		@IntParam('roomId') roomId: number,
		@IntParam('id') id: number,
		@CurrentUser() user: SecurityUserDto,
		@Body() body: UpdateTaskDto
	): Promise<TaskDto> {
		const { id: userId, } = user;

		const task = await this.tasksService.update({ roomId, id, ...body, });

		await this.activitiesService.create({
			roomId,
			activistId: userId,
			sphereName: ActivitySphereCodes.TASK,
			actionName: ActivityActionCodes.UPDATE,
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
	@IsMember()
	@Auth()
	@Delete('/:roomId/:id/remove')
	async remove(
		@IntParam('roomId') roomId: number,
		@IntParam('id') id: number,
		@CurrentUser() user: SecurityUserDto
	): Promise<boolean> {
		const { id: userId, } = user;

		const response = await this.tasksService.remove({ roomId, id, });

		await this.activitiesService.create({
			roomId,
			activistId: userId,
			sphereName: ActivitySphereCodes.TASK,
			actionName: ActivityActionCodes.REMOVE,
		});

		return response;
	}
}
