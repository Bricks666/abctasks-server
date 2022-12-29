import { PickType } from '@nestjs/swagger';
import { UserDto } from './user.dto';

export class GetUserDto extends PickType(UserDto, ['id']) {}
