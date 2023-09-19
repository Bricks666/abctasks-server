import { PickType } from '@nestjs/swagger';
import { UserDto } from '@/users';

export class LoginDto extends PickType(UserDto, ['email', 'password']) {}
