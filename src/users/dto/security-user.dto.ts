import { OmitType } from '@nestjs/swagger';
import { User } from '../models';

export class SecurityUserDto extends OmitType(User, ['password']) {}
