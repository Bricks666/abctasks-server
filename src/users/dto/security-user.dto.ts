import { OmitType } from '@nestjs/swagger';
import { UserDto } from './user.dto';

export class SecurityUserDto extends OmitType(UserDto, [
	'password',
	'activated'
]) {}
