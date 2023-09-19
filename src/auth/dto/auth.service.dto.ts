import { IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { SecurityUserDto } from '@/users';
import { TokensDto } from './tokens.dto';

export class AuthenticationResultDto {
	@ApiProperty({
		description: 'Данные пользователя',
		type: SecurityUserDto,
	})
	@IsObject()
	declare readonly user: SecurityUserDto;

	@ApiProperty({
		description: 'Токены доступа пользователя',
		type: TokensDto,
	})
	@IsObject()
	declare readonly tokens: TokensDto;
}
