import { PartialType, PickType } from '@nestjs/swagger';
import { Task } from '../models';

export class UpdateTaskDto extends PartialType(
	PickType(Task, ['content', 'status'])
) {}
