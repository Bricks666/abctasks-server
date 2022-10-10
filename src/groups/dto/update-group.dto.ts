import { PartialType, PickType } from '@nestjs/swagger';
import { Group } from '../models';

export class UpdateGroupDto extends PartialType(
	PickType(Group, [
		'groupName',
		'groupMainColor',
		'groupSecondColor',
		'groupName',
	])
) {}
