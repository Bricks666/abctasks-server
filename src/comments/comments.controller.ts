import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Delete,
	Put,
	Query,
	ParseIntPipe
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
import { PaginationQueryDto, User } from '@/common';
import { Auth } from '@/auth/auth.decorator';
import { InRoom } from '@/rooms/in-room.decorator';
import { CommentsService } from './comments.service';
import { CommentDto, CreateCommentDto, UpdateCommentDto } from './dto';
import { ActivitiesService } from '@/activities/activities.service';
import { SecurityUserDto } from '@/users/dto';

@ApiTags('Комментарии')
@Controller('comments')
export class CommentsController {
	constructor(
		private readonly commentsService: CommentsService,
		private readonly activitiesService: ActivitiesService
	) {}

	@ApiOperation({
		summary: 'Получение комментариев в комнате по задачи',
	})
	@ApiParam({
		type: Number,
		name: 'roomId',
		description: 'Id комнаты',
	})
	@ApiParam({
		type: Number,
		name: 'taskId',
		description: 'Id задачи',
	})
	@ApiOkResponse({
		type: CommentDto,
		isArray: true,
		description: 'Комментарии задачи',
	})
	@Get('/:roomId/:taskId')
	async getAll(
		@Param('taskId', ParseIntPipe) taskId: number,
		@Param('roomId', ParseIntPipe) roomId: number,
		@Query() query: PaginationQueryDto
	): Promise<CommentDto[]> {
		return this.commentsService.getAll({ roomId, taskId, ...query, });
	}

	@ApiOperation({
		summary: 'Получение комментария',
	})
	@ApiParam({
		type: Number,
		name: 'roomId',
		description: 'Id комнаты',
	})
	@ApiParam({
		type: Number,
		name: 'taskId',
		description: 'Id задачи',
	})
	@ApiParam({
		type: Number,
		name: 'id',
		description: 'Id комментария',
	})
	@ApiOkResponse({
		type: CommentDto,
		description: 'Комментарий задачи',
	})
	@ApiNotFoundResponse({
		description: 'Комментарий не найден',
	})
	@Get('/:roomId/:taskId/:id')
	async getOne(
		@Param('id', ParseIntPipe) id: number,
		@Param('taskId', ParseIntPipe) taskId: number,
		@Param('roomId', ParseIntPipe) roomId: number
	): Promise<CommentDto> {
		return this.commentsService.getOne({ id, taskId, roomId, });
	}

	@ApiOperation({
		summary: 'Создание комментария',
	})
	@ApiParam({
		type: Number,
		name: 'roomId',
		description: 'Id комнаты',
	})
	@ApiParam({
		type: Number,
		name: 'taskId',
		description: 'Id задачи',
	})
	@ApiBody({
		type: CreateCommentDto,
		description: 'Данные для создание комментария',
	})
	@ApiCreatedResponse({
		type: CommentDto,
		description: 'Созданный комментарий',
	})
	@Auth()
	@InRoom()
	@Post('/:roomId/:taskId/create')
	async create(
		@Param('taskId', ParseIntPipe) taskId: number,
		@Param('roomId', ParseIntPipe) roomId: number,
		@User() user: SecurityUserDto,
		@Body() body: CreateCommentDto
	): Promise<CommentDto> {
		const { id: authorId, } = user;
		const comment = await this.commentsService.create({
			roomId,
			taskId,
			authorId,
			...body,
		});
		await this.activitiesService.create({
			roomId,
			action: 'create',
			activistId: authorId,
			sphereName: 'comment',
		});
		return comment;
	}

	@ApiOperation({
		summary: 'Изменение комментария',
	})
	@ApiParam({
		type: Number,
		name: 'roomId',
		description: 'Id комнаты',
	})
	@ApiParam({
		type: Number,
		name: 'taskId',
		description: 'Id задачи',
	})
	@ApiParam({
		type: Number,
		name: 'id',
		description: 'Id комментария',
	})
	@ApiBody({
		type: UpdateCommentDto,
		description: 'Данные для обновления комментария',
	})
	@ApiOkResponse({
		type: CommentDto,
		description: 'Обновленный комментарий',
	})
	@ApiNotFoundResponse({
		description: 'Комментарий не найден',
	})
	@Auth()
	@InRoom()
	@Put('/:roomId/:taskId/:id/update')
	async update(
		@Param('id', ParseIntPipe) id: number,
		@Param('taskId', ParseIntPipe) taskId: number,
		@Param('roomId', ParseIntPipe) roomId: number,
		@User() user: SecurityUserDto,
		@Body() body: UpdateCommentDto
	): Promise<CommentDto> {
		const { id: authorId, } = user;
		const comment = await this.commentsService.update({
			id,
			taskId,
			roomId,
			...body,
		});
		await this.activitiesService.create({
			roomId,
			action: 'update',
			activistId: authorId,
			sphereName: 'comment',
		});
		return comment;
	}

	@ApiOperation({
		summary: 'Удаление комментария',
	})
	@ApiParam({
		type: Number,
		name: 'roomId',
		description: 'Id комнаты',
	})
	@ApiParam({
		type: Number,
		name: 'taskId',
		description: 'Id задачи',
	})
	@ApiParam({
		type: Number,
		name: 'id',
		description: 'Id комментария',
	})
	@ApiOkResponse({
		type: Boolean,
		description: 'Удалось ли удалить комментарий',
	})
	@ApiNotFoundResponse({
		description: 'Комментарий не найден',
	})
	@Auth()
	@InRoom()
	@Delete('/:roomId/:taskId/:id/remove')
	async remove(
		@Param('id', ParseIntPipe) id: number,
		@Param('taskId', ParseIntPipe) taskId: number,
		@Param('roomId', ParseIntPipe) roomId: number,
		@User() user: SecurityUserDto
	): Promise<boolean> {
		const { id: authorId, } = user;
		const comment = await this.commentsService.remove({ id, taskId, roomId, });
		await this.activitiesService.create({
			roomId,
			action: 'update',
			activistId: authorId,
			sphereName: 'comment',
		});
		return comment;
	}
}
