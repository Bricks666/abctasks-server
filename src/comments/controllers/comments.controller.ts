import {
	Controller,
	Get,
	Post,
	Body,
	Delete,
	Put,
	Query
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
import { IntParam, PaginationQueryDto } from '@/shared';
import { Auth, CurrentUser } from '@/auth';
import { InRoom } from '@/rooms';
import {
	ActivitiesService,
	ActivityActionCodes,
	ActivitySphereCodes
} from '@/activities';
import { SecurityUserDto } from '@/users';
import { CommentDto, CreateCommentDto, UpdateCommentDto } from '../dto';
import { CommentsService } from '../services';

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
		@IntParam('taskId') taskId: number,
		@IntParam('roomId') roomId: number,
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
		@IntParam('id') id: number,
		@IntParam('taskId') taskId: number,
		@IntParam('roomId') roomId: number
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
	@InRoom()
	@Auth()
	@Post('/:roomId/:taskId/create')
	async create(
		@IntParam('taskId') taskId: number,
		@IntParam('roomId') roomId: number,
		@CurrentUser() user: SecurityUserDto,
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
			activistId: authorId,
			sphereName: ActivitySphereCodes.COMMENT,
			actionName: ActivityActionCodes.CREATE,
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
	@InRoom()
	@Auth()
	@Put('/:roomId/:taskId/:id/update')
	async update(
		@IntParam('id') id: number,
		@IntParam('taskId') taskId: number,
		@IntParam('roomId') roomId: number,
		@CurrentUser() user: SecurityUserDto,
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
			activistId: authorId,
			sphereName: ActivitySphereCodes.COMMENT,
			actionName: ActivityActionCodes.UPDATE,
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
	@InRoom()
	@Auth()
	@Delete('/:roomId/:taskId/:id/remove')
	async remove(
		@IntParam('id') id: number,
		@IntParam('taskId') taskId: number,
		@IntParam('roomId') roomId: number,
		@CurrentUser() user: SecurityUserDto
	): Promise<boolean> {
		const { id: authorId, } = user;
		const comment = await this.commentsService.remove({ id, taskId, roomId, });
		await this.activitiesService.create({
			roomId,
			activistId: authorId,
			sphereName: ActivitySphereCodes.COMMENT,
			actionName: ActivityActionCodes.REMOVE,
		});
		return comment;
	}
}
