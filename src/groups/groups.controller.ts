import {
	Body,
	Controller,
	Delete,
	Get,
	HttpStatus,
	NotFoundException,
	Param,
	ParseIntPipe,
	Post,
	Put,
} from '@nestjs/common';
import {
	ApiBody,
	ApiOperation,
	ApiParam,
	ApiResponse,
	ApiTags,
} from '@nestjs/swagger';
import { CreateGroupDto, UpdateGroupDto } from './dto';
import { GroupsService } from './groups.service';
import { Group } from './models';
import { ActivitiesService } from '@/activities/activities.service';
import { Auth } from '@/decorators/auth.decorator';
import { AuthToken } from '@/decorators/auth-token.decorator';
import { AuthService } from '@/auth/auth.service';

@ApiTags('Группы')
@Controller('groups')
export class GroupsController {
	constructor(
		private readonly groupsService: GroupsService,
		private readonly authService: AuthService,
		private readonly activitiesService: ActivitiesService
	) {}

	@ApiOperation({
		summary: 'Получение всех групп в комнате',
	})
	@ApiParam({
		name: 'roomId',
		type: Number,
		description: 'Id комнаты',
	})
	@ApiResponse({
		status: HttpStatus.OK,
		type: Group,
		isArray: true,
	})
	@Get('/:roomId')
	async getAll(
		@Param('roomId', ParseIntPipe) roomId: number
	): Promise<Group[]> {
		return this.groupsService.getAll(roomId);
	}

	@ApiOperation({
		summary: 'Получение группы из комнате',
	})
	@ApiParam({
		name: 'roomId',
		type: Number,
		description: 'Id комнаты',
	})
	@ApiParam({
		name: 'taskId',
		type: Number,
		description: 'Id группы',
	})
	@ApiResponse({
		status: HttpStatus.OK,
		type: Group,
	})
	@ApiResponse({
		status: HttpStatus.NOT_FOUND,
		type: NotFoundException,
	})
	@Get('/:roomId/:id')
	async getOne(
		@Param('roomId', ParseIntPipe) roomId: number,
		@Param('id', ParseIntPipe) id: number
	): Promise<Group> {
		return this.groupsService.getOne(roomId, id);
	}

	@ApiOperation({
		summary: 'Создание новой группы',
	})
	@ApiParam({
		name: 'roomId',
		type: Number,
		description: 'Id комнаты',
	})
	@ApiBody({
		type: CreateGroupDto,
		description: 'Тело новой группы',
	})
	@ApiResponse({
		status: HttpStatus.OK,
		type: Group,
	})
	@Auth()
	@Post('/:roomId/create')
	async create(
		@Param('roomId', ParseIntPipe) roomId: number,
		@Body() dto: CreateGroupDto,
		@AuthToken() token: string
	): Promise<Group> {
		const { id: userId } = await this.authService.verifyUser(token);
		const group = await this.groupsService.create(roomId, dto);
		await this.activitiesService.create(roomId, {
			sphere: 'group',
			type: 'create',
			activistId: userId,
		});
		return group;
	}

	@ApiOperation({
		summary: 'Изменение группы',
	})
	@ApiParam({
		name: 'roomId',
		type: Number,
		description: 'Id комнаты',
	})
	@ApiParam({
		name: 'id',
		type: Number,
		description: 'Id группы',
	})
	@ApiBody({
		type: UpdateGroupDto,
		description: 'Новые данные группы',
	})
	@ApiResponse({
		status: HttpStatus.OK,
		type: Group,
	})
	@Auth()
	@Put('/:roomId/:id/update')
	async update(
		@Param('roomId', ParseIntPipe) roomId: number,
		@Param('id', ParseIntPipe) id: number,
		@Body() dto: UpdateGroupDto,
		@AuthToken() token: string
	): Promise<Group> {
		const { id: userId } = await this.authService.verifyUser(token);
		const group = await this.groupsService.update(roomId, id, dto);
		await this.activitiesService.create(roomId, {
			sphere: 'group',
			type: 'update',
			activistId: userId,
		});
		return group;
	}

	@ApiOperation({
		summary: 'Удаление группы',
	})
	@ApiParam({
		name: 'roomId',
		type: Number,
		description: 'Id комнаты',
	})
	@ApiParam({
		name: 'id',
		type: Number,
		description: 'Id группы',
	})
	@ApiResponse({
		status: HttpStatus.OK,
		type: Boolean,
	})
	@Auth()
	@Delete('/:roomId/:id/remove')
	async remove(
		@Param('roomId', ParseIntPipe) roomId: number,
		@Param('id', ParseIntPipe) id: number,
		@AuthToken() token: string
	): Promise<boolean> {
		const { id: userId } = await this.authService.verifyUser(token);
		const response = await this.groupsService.remove(roomId, id);
		await this.activitiesService.create(roomId, {
			sphere: 'group',
			type: 'remove',
			activistId: userId,
		});
		return response;
	}
}