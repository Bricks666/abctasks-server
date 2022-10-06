import { PickType } from '@nestjs/swagger';
import { User } from '../user.model';

export class SecurityUserDto extends PickType(User, [
	'userId',
	'login',
	'photo',
]) {}
