import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { TaskDto } from './task.dto';

export class CreateTaskDto extends PickType(TaskDto, [
	'title',
	'description',
	'status'
]) {
	@ApiProperty({
		type: Number,
		isArray: true,
	})
	@IsNumber({}, { each: true, })
	declare tagIds: number[];
}
