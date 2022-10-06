import { PickType } from '@nestjs/swagger';
import { User } from '../models';

export class CreateUserDto extends PickType(User, ['login', 'photo', 'password']) {}
