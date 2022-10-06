import {
	Body,
	Controller,
	Get,
	Param,
	ParseIntPipe,
	Put,
} from '@nestjs/common';
import { SecurityUserDto } from '@/users/dto';
import { UpdateUserDto } from './dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get('/')
	async getUsers(): Promise<SecurityUserDto[]> {
		return this.usersService.getUsers();
	}

	@Put('/:userId/update')
	async updateUser(
		@Param('userId', ParseIntPipe) userId: number,
		@Body() dto: UpdateUserDto
	): Promise<SecurityUserDto> {
		return this.usersService.updateUser(userId, dto);
	}
}
