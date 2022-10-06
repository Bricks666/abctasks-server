import { PickType } from '@nestjs/swagger';
import { User } from '../user.model';

export class GetUserDto extends PickType(User, ['userId']) {}
