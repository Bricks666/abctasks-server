import {
	Body,
	CacheInterceptor,
	Controller,
	Get,
	Param,
	ParseIntPipe,
	Put,
	UseInterceptors,
} from '@nestjs/common';
import {
	ApiTags,
	ApiOperation,
	ApiResponse,
	ApiBody,
	ApiParam,
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
		description: 'Пользователи, зарегистрированные на сайте',
		isArray: true,
		type: SecurityUserDto,
	})
	@UseInterceptors(CacheInterceptor)
	@Get('/')
	async getAll(): Promise<SecurityUserDto[]> {
		return this.usersService.getAll();
	}

	@ApiOperation({
		summary: 'Обновление данных о пользователе',
	})
	@ApiBody({
		type: UpdateUserDto,
		description: 'Новые данные пользователя',
	})
	@ApiParam({
		name: 'userId',
		type: Number,
		description: 'Id пользователя',
	})
	@ApiResponse({
		type: SecurityUserDto,
		description: 'Обновленный пользователь',
	})
	@Auth()
	@Put('/:userId/update')
	async updateUser(
		@Param('userId', ParseIntPipe) userId: number,
		@Body() dto: UpdateUserDto
	): Promise<SecurityUserDto> {
		return this.usersService.update(userId, dto);
	}
}
