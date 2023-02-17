import { PickType } from '@nestjs/swagger';
import { ActivityDto } from './activity.dto';

export class CreateActivityDto extends PickType(ActivityDto, [
	'actionId',
	'activistId',
	'sphereId'
]) {}
