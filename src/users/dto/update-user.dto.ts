import { PartialType, PickType } from '@nestjs/swagger';
import { User } from '../models';

export class UpdateUserDto extends PartialType(PickType(User, ['photo', 'password'])) {}
