import { PickType } from '@nestjs/swagger';
import { UserDto } from '@/users/dto';

export class LoginDto extends PickType(UserDto, ['email', 'password']) {}
