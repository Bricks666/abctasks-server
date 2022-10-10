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
	UnauthorizedException,
	UseGuards,
} from '@nestjs/common';
import {
	ApiBearerAuth,
	ApiBody,
	ApiOperation,
	ApiParam,
	ApiResponse,
	ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@/auth/auth.guard';
import { CreateGroupDto, UpdateGroupDto } from './dto';
import { GroupsService } from './groups.service';
import { Group } from './models';

@ApiTags('Группы')
@Controller('groups')
export class GroupsController {
	constructor(private readonly groupsService: GroupsService) {}

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
	async getGroups(
		@Param('roomId', ParseIntPipe) roomId: number
	): Promise<Group[]> {
		return this.groupsService.getGroups(roomId);
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
	@Get('/:roomId/:groupId')
	async getGroup(
		@Param('roomId', ParseIntPipe) roomId: number,
		@Param('groupId', ParseIntPipe) groupId: number
	): Promise<Group> {
		return this.groupsService.getGroup(roomId, groupId);
	}

	@ApiOperation({
		summary: 'Создание новой группы',
	})
	@ApiBearerAuth()
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
	@ApiResponse({
		status: HttpStatus.UNAUTHORIZED,
		type: UnauthorizedException,
	})
	@UseGuards(AuthGuard)
	@Post('/:roomId/create')
	async createGroup(
		@Param('roomId', ParseIntPipe) roomId: number,
		@Body() dto: CreateGroupDto
	): Promise<Group> {
		return this.groupsService.createGroup(roomId, dto);
	}

	@ApiOperation({
		summary: 'Изменение группы',
	})
	@ApiBearerAuth()
	@ApiParam({
		name: 'roomId',
		type: Number,
		description: 'Id комнаты',
	})
	@ApiParam({
		name: 'groupId',
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
	@ApiResponse({
		status: HttpStatus.UNAUTHORIZED,
		type: UnauthorizedException,
	})
	@UseGuards(AuthGuard)
	@Put('/:roomId/:groupId/update')
	async updateGroup(
		@Param('roomId', ParseIntPipe) roomId: number,
		@Param('groupId', ParseIntPipe) groupId: number,
		@Body() dto: UpdateGroupDto
	): Promise<Group> {
		return this.groupsService.updateGroup(roomId, groupId, dto);
	}

	@ApiOperation({
		summary: 'Удаление группы',
	})
	@ApiBearerAuth()
	@ApiParam({
		name: 'roomId',
		type: Number,
		description: 'Id комнаты',
	})
	@ApiParam({
		name: 'groupId',
		type: Number,
		description: 'Id группы',
	})
	@ApiResponse({
		status: HttpStatus.OK,
		type: Boolean,
	})
	@ApiResponse({
		status: HttpStatus.UNAUTHORIZED,
		type: UnauthorizedException,
	})
	@UseGuards(AuthGuard)
	@Delete('/:roomId/:groupId/delete')
	async deleteGroup(
		@Param('roomId', ParseIntPipe) roomId: number,
		@Param('groupId', ParseIntPipe) groupId: number
	): Promise<boolean> {
		return this.groupsService.deleteGroup(roomId, groupId);
	}
}
