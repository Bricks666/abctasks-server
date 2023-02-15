import { PickType } from '@nestjs/swagger';
import { UserDto } from './user.dto';

export class GetUserByNameDto extends PickType(UserDto, ['username']) {}
