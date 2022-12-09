import { ApiProperty } from '@nestjs/swagger';
import { LoginDto } from './login.dto';

export class LoginRequestDto extends LoginDto {
	@ApiProperty({
		description: 'Запомнить ли пользователя',
		type: Boolean,
	})
	declare rememberMe: boolean;
}
