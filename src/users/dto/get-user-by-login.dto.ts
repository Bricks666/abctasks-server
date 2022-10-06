import { PickType } from '@nestjs/swagger';
import { User } from '../user.model';

export class GetUserByLoginDto extends PickType(User, ['login']) {}
