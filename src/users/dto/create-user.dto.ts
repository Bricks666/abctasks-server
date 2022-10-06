import { PickType } from '@nestjs/swagger';
import { User } from '../user.model';

export class CreateUserDto extends PickType(User, [
	'login',
	'photo',
	'password',
]) {}
