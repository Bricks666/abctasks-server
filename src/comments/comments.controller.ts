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
import { ApiTags } from '@nestjs/swagger';
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

	@Get('/:roomId/:taskId')
	async getAll(
		@Param('taskId', ParseIntPipe) taskId: number,
		@Query() dto: PaginationQueryDto
	): Promise<Comment[]> {
		return this.commentsService.getAll(taskId, dto);
	}

	@Get('/:roomId/:taskId/:id')
	async getOne(
		@Param('id', ParseIntPipe) id: number,
		@Param('taskId', ParseIntPipe) taskId: number
	): Promise<Comment> {
		return this.commentsService.getOne(id, taskId);
	}

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
