import { PickType } from '@nestjs/swagger';
import { User } from '@/users/models';

export class LoginDto extends PickType(User, ['login', 'password']) {}
