import { PartialType, PickType } from '@nestjs/swagger';
import { User } from '../user.model';

export class UpdateUserDto extends PartialType(
	PickType(User, ['photo', 'password'])
) {}
