import { PickType } from '@nestjs/swagger';
import { GroupDto } from './group.dto';

export class CreateGroupDto extends PickType(GroupDto, [
	'mainColor',
	'secondColor',
	'name'
]) {}
