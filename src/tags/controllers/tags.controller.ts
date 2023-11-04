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
import {
	ActivitiesService,
	ActivityActionCodes,
	ActivitySphereCodes
} from '@/activities';
import { IsMember } from '@/members/lib';
import { Auth, CurrentUser, DisableAuthCheck } from '@/auth';
import { IntParam } from '@/shared';
import { SecurityUserDto } from '@/users';
import { TagsService } from '../services';
import { CreateTagDto, TagDto, UpdateTagDto } from '../dto';

@ApiTags('Тэги')
@Controller('tags')
export class TagsController {
	constructor(
		private readonly tagsService: TagsService,
		private readonly activitiesService: ActivitiesService
	) {}

	@ApiOperation({
		summary: 'Получение всех тэгов в комнате',
	})
	@ApiParam({
		name: 'roomId',
		type: Number,
		description: 'Id комнаты',
	})
	@ApiOkResponse({
		type: TagDto,
		isArray: true,
	})
	@DisableAuthCheck()
	@UseInterceptors(CacheInterceptor)
	@Get('/:roomId')
	async getAll(@IntParam('roomId') roomId: number): Promise<TagDto[]> {
		return this.tagsService.getAll({ roomId, });
	}

	@ApiOperation({
		summary: 'Получение тэга из комнате',
	})
	@ApiParam({
		name: 'roomId',
		type: Number,
		description: 'Id комнаты',
	})
	@ApiParam({
		name: 'id',
		type: Number,
		description: 'Id тэга',
	})
	@ApiOkResponse({
		type: TagDto,
	})
	@ApiNotFoundResponse()
	@DisableAuthCheck()
	@UseInterceptors(CacheInterceptor)
	@Get('/:roomId/:id')
	async getOne(
		@IntParam('roomId') roomId: number,
		@IntParam('id') id: number
	): Promise<TagDto> {
		return this.tagsService.getOne({ roomId, id, });
	}

	@ApiOperation({
		summary: 'Создание новой тэга',
	})
	@ApiParam({
		name: 'roomId',
		type: Number,
		description: 'Id комнаты',
	})
	@ApiBody({
		type: CreateTagDto,
		description: 'Данные тэга',
	})
	@ApiCreatedResponse({
		type: TagDto,
		description: 'Созданная тэга',
	})
	@IsMember()
	@Auth()
	@Post('/:roomId/create')
	async create(
		@IntParam('roomId') roomId: number,
		@CurrentUser() user: SecurityUserDto,
		@Body() body: CreateTagDto
	): Promise<TagDto> {
		const { id: userId, } = user;

		const tag = await this.tagsService.create({ ...body, roomId, });

		await this.activitiesService.create({
			roomId,
			activistId: userId,
			sphereName: ActivitySphereCodes.TAG,
			actionName: ActivityActionCodes.CREATE,
		});

		return tag;
	}

	@ApiOperation({
		summary: 'Изменение тэга',
	})
	@ApiParam({
		name: 'roomId',
		type: Number,
		description: 'Id комнаты',
	})
	@ApiParam({
		name: 'id',
		type: Number,
		description: 'Id тэга',
	})
	@ApiBody({
		type: UpdateTagDto,
		description: 'Новые данные тэга',
	})
	@ApiOkResponse({
		type: TagDto,
		description: 'Обновленная тэга',
	})
	@IsMember()
	@Auth()
	@Put('/:roomId/:id/update')
	async update(
		@IntParam('roomId') roomId: number,
		@IntParam('id') id: number,
		@CurrentUser() user: SecurityUserDto,
		@Body() body: UpdateTagDto
	): Promise<TagDto> {
		const { id: userId, } = user;

		const tag = await this.tagsService.update({ ...body, roomId, id, });

		await this.activitiesService.create({
			roomId,
			activistId: userId,
			sphereName: ActivitySphereCodes.TAG,
			actionName: ActivityActionCodes.UPDATE,
		});

		return tag;
	}

	@ApiOperation({
		summary: 'Удаление тэга',
	})
	@ApiParam({
		name: 'roomId',
		type: Number,
		description: 'Id комнаты',
	})
	@ApiParam({
		name: 'id',
		type: Number,
		description: 'Id тэга',
	})
	@ApiOkResponse({
		type: Boolean,
		description: 'Удалось ли удалить тэг',
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
		const response = await this.tagsService.remove({ roomId, id, });

		await this.activitiesService.create({
			roomId,
			activistId: userId,
			sphereName: ActivitySphereCodes.TAG,
			actionName: ActivityActionCodes.REMOVE,
		});

		return response;
	}
}
