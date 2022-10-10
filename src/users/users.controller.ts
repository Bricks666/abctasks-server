import {
	Body,
	Controller,
	Get,
	Param,
	ParseIntPipe,
	Put,
	UseGuards,
} from '@nestjs/common';
import {
	ApiTags,
	ApiOperation,
	ApiResponse,
	ApiBearerAuth,
	ApiBody,
	ApiParam,
} from '@nestjs/swagger';
import { SecurityUserDto } from '@/users/dto';
import { UpdateUserDto } from './dto';
import { UsersService } from './users.service';
import { AuthGuard } from '@/auth/auth.guard';

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
	@Get('/')
	async getUsers(): Promise<SecurityUserDto[]> {
		return this.usersService.getUsers();
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
	@ApiBearerAuth()
	@UseGuards(AuthGuard)
	@Put('/:userId/update')
	async updateUser(
		@Param('userId', ParseIntPipe) userId: number,
		@Body() dto: UpdateUserDto
	): Promise<SecurityUserDto> {
		return this.usersService.updateUser(userId, dto);
	}
}
