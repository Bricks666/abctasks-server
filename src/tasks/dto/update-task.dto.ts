import { PartialType, PickType } from '@nestjs/swagger';
import { CreateTaskDto } from './create-task.dto';

export class UpdateTaskDto extends PartialType(
	PickType(CreateTaskDto, ['title', 'description', 'status', 'tagIds'])
) {}
