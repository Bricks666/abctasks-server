import { PickType } from '@nestjs/swagger';
import { Activity } from '../models';

export class CreateActivityDto extends PickType(Activity, [
	'action',
	'activistId'
]) {
	declare sphereName: string;
}
