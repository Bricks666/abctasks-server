import { PickType } from '@nestjs/swagger';
import { UserDto } from './user.dto';

export class GetUserByLoginDto extends PickType(UserDto, ['login']) {}
