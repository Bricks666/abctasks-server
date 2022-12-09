import { PickType } from '@nestjs/swagger';
import { User } from '../models';

export class SecurityUserDto extends PickType(User, ['id', 'login', 'photo']) {}
