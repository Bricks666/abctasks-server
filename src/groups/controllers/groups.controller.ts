import {
	Body,
	CacheInterceptor,
	Controller,
	Delete,
	Get,
	Post,
	Put,
	UseInterceptors
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
import { ActivitiesService } from '@/activities';
import { InRoom } from '@/rooms';
import { Auth, CurrentUser } from '@/auth';
import { IntParam } from '@/shared';
import { SecurityUserDto } from '@/users';
import { GroupsService } from '../services';
import { CreateGroupDto, GroupDto, UpdateGroupDto } from '../dto';

@ApiTags('Группы')
@Controller('groups')
export class GroupsController {
	constructor(
		private readonly groupsService: GroupsService,
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
	@ApiOkResponse({
		type: GroupDto,
		isArray: true,
	})
	@UseInterceptors(CacheInterceptor)
	@Get('/:roomId')
	async getAll(@IntParam('roomId') roomId: number): Promise<GroupDto[]> {
		return this.groupsService.getAll({ roomId, });
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
		name: 'id',
		type: Number,
		description: 'Id группы',
	})
	@ApiOkResponse({
		type: GroupDto,
	})
	@ApiNotFoundResponse()
	@UseInterceptors(CacheInterceptor)
	@Get('/:roomId/:id')
	async getOne(
		@IntParam('roomId') roomId: number,
		@IntParam('id') id: number
	): Promise<GroupDto> {
		return this.groupsService.getOne({ roomId, id, });
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
	@ApiCreatedResponse({
		type: GroupDto,
		description: 'Созданная группа',
	})
	@InRoom()
	@Auth()
	@Post('/:roomId/create')
	async create(
		@IntParam('roomId') roomId: number,
		@CurrentUser() user: SecurityUserDto,
		@Body() body: CreateGroupDto
	): Promise<GroupDto> {
		const { id: userId, } = user;

		const group = await this.groupsService.create({ ...body, roomId, });

		await this.activitiesService.create({
			roomId,
			sphereName: 'group',
			action: 'create',
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
	@ApiOkResponse({
		type: GroupDto,
		description: 'Обновленная группа',
	})
	@InRoom()
	@Auth()
	@Put('/:roomId/:id/update')
	async update(
		@IntParam('roomId') roomId: number,
		@IntParam('id') id: number,
		@CurrentUser() user: SecurityUserDto,
		@Body() body: UpdateGroupDto
	): Promise<GroupDto> {
		const { id: userId, } = user;

		const group = await this.groupsService.update({ ...body, roomId, id, });

		await this.activitiesService.create({
			roomId,
			sphereName: 'group',
			action: 'update',
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
	@ApiOkResponse({
		type: Boolean,
		description: 'Удалось ли удалить группу',
	})
	@InRoom()
	@Auth()
	@Delete('/:roomId/:id/remove')
	async remove(
		@IntParam('roomId') roomId: number,
		@IntParam('id') id: number,
		@CurrentUser() user: SecurityUserDto
	): Promise<boolean> {
		const { id: userId, } = user;

		const response = await this.groupsService.remove({ roomId, id, });

		await this.activitiesService.create({
			roomId,
			sphereName: 'group',
			action: 'remove',
			activistId: userId,
		});

		return response;
	}
}
