import {
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	UseGuards,
	ParseIntPipe,
	Body,
	UnauthorizedException,
	HttpStatus,
	NotFoundException,
} from '@nestjs/common';
import {
	ApiOperation,
	ApiBearerAuth,
	ApiResponse,
	ApiParam,
	ApiBody,
	ApiTags,
} from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { AuthGuard } from '@/auth/auth.guard';
import { Task } from './models';
import { AuthToken } from '@/decorators/auth-token.decorator';
import { CreateTaskDto, UpdateTaskDto } from './dto';
import { AuthService } from '@/auth/auth.service';

@ApiTags('Задачи')
@Controller('tasks')
export class TasksController {
	constructor(
		private readonly tasksService: TasksService,
		private readonly authService: AuthService
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
	async getTasks(@Param('roomId', ParseIntPipe) roomId: number): Promise<Task[]> {
		return this.tasksService.getTasks(roomId);
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
		name: 'taskId',
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
	@Get('/:roomId/:taskId')
	async getTask(
		@Param('roomId', ParseIntPipe) roomId: number,
		@Param('taskId', ParseIntPipe) taskId: number
	): Promise<Task> {
		return this.tasksService.getTask(roomId, taskId);
	}

	@ApiOperation({
		summary: 'Создание новой задачи',
	})
	@ApiBearerAuth()
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
	@ApiResponse({
		status: HttpStatus.UNAUTHORIZED,
		type: UnauthorizedException,
	})
	@UseGuards(AuthGuard)
	@Post('/:roomId/create')
	async createTask(
		@Param('roomId', ParseIntPipe) roomId: number,
		@AuthToken() token: string,
		@Body() dto: CreateTaskDto
	): Promise<Task> {
		const { userId } = await this.authService.verifyUser(token);
		return this.tasksService.createTask({
			roomId,
			authorId: userId,
			...dto,
		});
	}

	@ApiOperation({
		summary: 'Изменение информации о комнате',
	})
	@ApiBearerAuth()
	@ApiParam({
		name: 'roomId',
		type: Number,
		description: 'Id комнаты',
	})
	@ApiParam({
		name: 'taskId',
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
		status: HttpStatus.UNAUTHORIZED,
		type: UnauthorizedException,
	})
	@ApiResponse({
		status: HttpStatus.NOT_FOUND,
		type: NotFoundException,
	})
	@UseGuards(AuthGuard)
	@Put('/:roomId/:taskId/update')
	async updateTask(
		@Param('roomId', ParseIntPipe) roomId: number,
		@Param('taskId', ParseIntPipe) taskId: number,
		@Body() dto: UpdateTaskDto
	): Promise<Task> {
		return this.tasksService.updateTask(roomId, taskId, dto);
	}

	@ApiOperation({
		summary: 'Изменение информации о комнате',
	})
	@ApiBearerAuth()
	@ApiParam({
		name: 'roomId',
		type: Number,
		description: 'Id комнаты',
	})
	@ApiParam({
		name: 'taskId',
		type: Number,
		description: 'Id задачи',
	})
	@ApiResponse({
		status: HttpStatus.OK,
		type: undefined,
	})
	@UseGuards(AuthGuard)
	@Delete('/:roomId/:taskId/delete')
	async deleteTask(
		@Param('roomId', ParseIntPipe) roomId: number,
		@Param('taskId', ParseIntPipe) taskId: number
	) {
		await this.tasksService.deleteTask(roomId, taskId);
	}
}
