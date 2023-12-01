import {
	Body,
	CacheInterceptor,
	Controller,
	Get,
	Put,
	Query,
	UseInterceptors
} from '@nestjs/common';
import {
	ApiTags,
	ApiOperation,
	ApiBody,
	ApiParam,
	ApiOkResponse,
	ApiNotFoundResponse
} from '@nestjs/swagger';
import { GetUsersQueryDto, SecurityUserDto } from '@/users/dto';
import { Auth } from '@/auth/lib';
import { IntParam } from '@/shared';
import { UpdateUserDto } from '../dto';
import { UsersService } from '../services';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@ApiOperation({
		summary: 'Получение всех пользователей',
	})
	@ApiOkResponse({
		isArray: true,
		type: SecurityUserDto,
		description: 'Пользователи, зарегистрированные на сайте',
	})
	@UseInterceptors(CacheInterceptor)
	@Get('/')
	async getAll(@Query() dto: GetUsersQueryDto): Promise<SecurityUserDto[]> {
		return this.usersService.getAll(dto);
	}

	@ApiOperation({
		summary: 'Получение пользователя по id',
	})
	@ApiParam({
		name: 'id',
		type: Number,
		description: 'Id пользователя',
	})
	@ApiOkResponse({
		type: SecurityUserDto,
		description: 'Пользователь с переданным id',
	})
	@ApiNotFoundResponse()
	@UseInterceptors(CacheInterceptor)
	@Get('/:id')
	async getOne(@IntParam('id') id: number): Promise<SecurityUserDto> {
		return this.usersService.getOne({ id, });
	}

	@ApiOperation({
		summary: 'Обновление данных о пользователе',
	})
	@ApiBody({
		type: UpdateUserDto,
		description: 'Новые данные пользователя',
	})
	@ApiParam({
		name: 'id',
		type: Number,
		description: 'Id пользователя',
	})
	@ApiOkResponse({
		type: SecurityUserDto,
		description: 'Обновленный пользователь',
	})
	@Auth()
	@Put('/:id/update')
	async updateUser(
		@IntParam('id') id: number,
		@Body() dto: UpdateUserDto
	): Promise<SecurityUserDto> {
		return this.usersService.update({ id, ...dto, });
	}
}
