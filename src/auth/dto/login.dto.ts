import { PickType } from '@nestjs/swagger';
import { User } from '@/users/user.model';

export class LoginDto extends PickType(User, ['login', 'password']) {}

export class LoginRequestDto extends LoginDto {
	declare rememberMe: boolean;
}
