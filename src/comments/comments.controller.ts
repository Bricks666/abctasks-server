import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Delete,
	Put,
	Query,
	ParseIntPipe,
	HttpStatus,
	NotFoundException
} from '@nestjs/common';
import {
	ApiBody,
	ApiOperation,
	ApiParam,
	ApiQuery,
	ApiResponse,
	ApiTags
} from '@nestjs/swagger';
import { PaginationQueryDto } from '@/common';
import { Auth } from '@/auth/auth.decorator';
import { InRoom } from '@/rooms/in-room.decorator';
import { CommentsService } from './comments.service';
import { CreateCommentDto, UpdateCommentDto } from './dto';
import { AuthToken } from '@/auth/auth-token.decorator';
import { AuthService } from '@/auth/auth.service';
import { Comment } from './models';

@ApiTags('Комментарии')
@Controller('comments')
export class CommentsController {
	constructor(
		private readonly commentsService: CommentsService,
		private readonly authService: AuthService
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
	@ApiQuery({
		type: PaginationQueryDto,
		description: 'Параметры пагинации',
	})
	@ApiResponse({
		type: Comment,
		isArray: true,
		description: 'Комментарии задачи',
		status: HttpStatus.OK,
	})
	@Get('/:roomId/:taskId')
	async getAll(
		@Param('taskId', ParseIntPipe) taskId: number,
		@Query() dto: PaginationQueryDto
	): Promise<Comment[]> {
		return this.commentsService.getAll(taskId, dto);
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
	@ApiResponse({
		type: Comment,
		description: 'Комментарий задачи',
		status: HttpStatus.OK,
	})
	@ApiResponse({
		type: NotFoundException,
		description: 'Комментарий не найден',
		status: HttpStatus.NOT_FOUND,
	})
	@Get('/:roomId/:taskId/:id')
	async getOne(
		@Param('id', ParseIntPipe) id: number,
		@Param('taskId', ParseIntPipe) taskId: number
	): Promise<Comment> {
		return this.commentsService.getOne(id, taskId);
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
	@ApiResponse({
		type: Comment,
		description: 'Созданный комментарий',
		status: HttpStatus.OK,
	})
	@Auth()
	@InRoom()
	@Post('/:roomId/:taskId/create')
	async create(
		@Param('taskId', ParseIntPipe) taskId: number,
		@AuthToken() token: string,
		@Body() createCommentDto: CreateCommentDto
	): Promise<Comment> {
		const { id: authorId, } = await this.authService.verifyUser(token);
		return this.commentsService.create(taskId, authorId, createCommentDto);
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
	@ApiResponse({
		type: Comment,
		description: 'Обновленный комментарий',
		status: HttpStatus.OK,
	})
	@ApiResponse({
		type: NotFoundException,
		description: 'Комментарий не найден',
		status: HttpStatus.NOT_FOUND,
	})
	@Auth()
	@InRoom()
	@Put('/:roomId/:taskId/:id/update')
	async update(
		@Param('id', ParseIntPipe) id: number,
		@Param('taskId', ParseIntPipe) taskId: number,
		@Body() dto: UpdateCommentDto
	): Promise<Comment> {
		return this.commentsService.update(id, taskId, dto);
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
	@ApiResponse({
		type: Boolean,
		description: 'Удалось ли удалить комментарий',
		status: HttpStatus.OK,
	})
	@ApiResponse({
		type: NotFoundException,
		description: 'Комментарий не найден',
		status: HttpStatus.NOT_FOUND,
	})
	@Auth()
	@InRoom()
	@Delete('/:roomId/:taskId/:id/remove')
	async remove(
		@Param('id', ParseIntPipe) id: number,
		@Param('taskId', ParseIntPipe) taskId: number
	): Promise<boolean> {
		return this.commentsService.remove(id, taskId);
	}
}
