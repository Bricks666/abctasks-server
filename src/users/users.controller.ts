import {
	Body,
	CacheInterceptor,
	Controller,
	Get,
	HttpStatus,
	Param,
	ParseIntPipe,
	Put,
	Query,
	UseInterceptors
} from '@nestjs/common';
import {
	ApiTags,
	ApiOperation,
	ApiResponse,
	ApiBody,
	ApiParam,
	ApiQuery
} from '@nestjs/swagger';
import { GetUsersQueryDto, SecurityUserDto } from '@/users/dto';
import { UpdateUserDto } from './dto';
import { UsersService } from './users.service';
import { Auth } from '@/auth/auth.decorator';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@ApiOperation({
		summary: 'Получение всех пользователей',
	})
	@ApiResponse({
		isArray: true,
		status: HttpStatus.OK,
		type: SecurityUserDto,
		description: 'Пользователи, зарегистрированные на сайте',
	})
	@ApiQuery({
		type: GetUsersQueryDto,
		description: 'Параметры фильтрации пользователей',
		required: false,
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
	@ApiResponse({
		status: HttpStatus.OK,
		type: SecurityUserDto,
		description: 'Пользователь с переданным id',
	})
	@UseInterceptors(CacheInterceptor)
	@Get('/:id')
	async getOne(
		@Param('id', ParseIntPipe) id: number
	): Promise<SecurityUserDto> {
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
	@ApiResponse({
		type: SecurityUserDto,
		status: HttpStatus.OK,
		description: 'Обновленный пользователь',
	})
	@Auth()
	@Put('/:id/update')
	async updateUser(
		@Param('id', ParseIntPipe) id: number,
		@Body() dto: UpdateUserDto
	): Promise<SecurityUserDto> {
		return this.usersService.update({ id, ...dto, });
	}
}
