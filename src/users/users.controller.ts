import {
	Body,
	CacheInterceptor,
	Controller,
	Get,
	HttpStatus,
	Param,
	ParseIntPipe,
	Put,
	UseInterceptors
} from '@nestjs/common';
import {
	ApiTags,
	ApiOperation,
	ApiResponse,
	ApiBody,
	ApiParam
} from '@nestjs/swagger';
import { SecurityUserDto } from '@/users/dto';
import { UpdateUserDto } from './dto';
import { UsersService } from './users.service';
import { Auth } from '@/decorators/auth.decorator';

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
	@UseInterceptors(CacheInterceptor)
	@Get('/')
	async getAll(): Promise<SecurityUserDto[]> {
		return this.usersService.getAll();
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
		summary:
			'Получение всех пользователей, логин которых начинается с переданного',
	})
	@ApiParam({
		name: 'login',
		description: 'Логин искомого пользователя',
		type: String,
	})
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Пользователи, зарегистрированные на сайте',
		isArray: true,
		type: SecurityUserDto,
	})
	@UseInterceptors(CacheInterceptor)
	@Get('/search/login/:login')
	async getAllByLogin(
		@Param('login') login: string
	): Promise<SecurityUserDto[]> {
		return this.usersService.getAllByLogin({ login, });
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
		return this.usersService.update(id, dto);
	}
}
