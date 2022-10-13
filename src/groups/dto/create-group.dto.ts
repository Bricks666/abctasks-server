import { PickType } from '@nestjs/swagger';
import { Group } from '../models';

export class CreateGroupDto extends PickType(Group, [
	'mainColor',
	'secondColor',
	'name',
]) {}