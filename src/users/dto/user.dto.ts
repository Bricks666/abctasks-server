import { ApiProperty, ApiHideProperty } from '@nestjs/swagger';
import { user as UserModel } from '@prisma/client';
import { IsNumber, IsString, IsOptional } from 'class-validator';

export class UserDto implements UserModel {
	@ApiProperty({
		type: Number,
		description: 'Id пользователя',
		example: 1,
	})
	@IsNumber()
	declare id: number;

	@ApiProperty({
		type: String,
		description: 'Логин пользователя',
		example: 'Login',
	})
	@IsString()
	declare login: string;

	@ApiProperty({
		type: String,
		description: 'Пароль пользователя',
		example: 'Password',
	})
	@ApiHideProperty()
	@IsString()
	declare password: string;

	@ApiProperty({
		type: String,
		description: 'Путь на фото пользователя',
		example: null,
		nullable: true,
	})
	@IsString()
	@IsOptional()
	declare photo: string | null;
}
