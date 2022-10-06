import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class TokensDto {
	@ApiProperty({
		description: 'Токен обновления',
		type: String,
	})
	@IsString()
	declare readonly refreshToken: string;

	@ApiProperty({
		description: 'Токен доступа',
		type: String,
	})
	@IsString()
	declare readonly accessToken: string;
}
