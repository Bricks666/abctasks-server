import { PickType } from '@nestjs/swagger';
import { User } from '../models';

export class GetUserByLoginDto extends PickType(User, ['login']) {}
