import { ApiProperty } from '@nestjs/swagger';
import {
	IsBoolean,
	IsEmail,
	IsNumber,
	IsOptional,
	IsString
} from 'class-validator';
import { NumberTransform } from '@/shared';

export class TestingUserDto {
	@ApiProperty({
		type: Number,
		description: 'Id пользователя',
		example: 1,
		required: false,
	})
	@NumberTransform()
	@IsOptional()
	@IsNumber()
	declare id?: number;

	@ApiProperty({
		type: String,
		description: 'Имя пользователя, которое будет отображаться',
		example: 'username',
		required: false,
	})
	@IsOptional()
	@IsString()
	declare username?: string;

	@ApiProperty({
		type: String,
		description: 'Почта, к которой будет привязан аккаунт',
		example: 'email@example.com',
		required: false,
	})
	@IsOptional()
	@IsEmail()
	declare email?: string;

	@ApiProperty({
		type: String,
		description: 'Password',
		example: 'some password',
		required: false,
	})
	@IsOptional()
	@IsString()
	declare password?: string;

	@ApiProperty({
		type: Boolean,
		description: 'Is account activated',
		example: true,
		required: false,
	})
	@IsOptional()
	@IsBoolean()
	declare activated?: boolean;
}
