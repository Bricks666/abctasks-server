import { PickType } from '@nestjs/swagger';
import { User } from '../models';

export class GetUserDto extends PickType(User, ['id']) {}
