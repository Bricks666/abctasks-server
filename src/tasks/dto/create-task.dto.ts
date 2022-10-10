import { PickType } from '@nestjs/swagger';
import { Task } from '../models';

export class CreateTaskDto extends PickType(Task, [
	'authorId',
	'groupId',
	'status',
	'content',
]) {}
