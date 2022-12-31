import { task as TaskModel, task_status } from '@prisma/client';
import { IsDate, IsEnum, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export type TaskStatus = task_status;

export class TaskDto implements TaskModel {
	@ApiProperty({
		type: Number,
		description: 'Id задачи',
		example: 1,
	})
	@IsNumber()
	declare id: number;

	@ApiProperty({
		type: Number,
		description: 'Id комнаты',
		example: 1,
	})
	@IsNumber()
	declare roomId: number;

	@ApiProperty({
		type: Number,
		description: 'Id группы',
		example: 1,
	})
	@IsNumber()
	declare groupId: number;

	@ApiProperty({
		type: Number,
		description: 'Id автора',
		example: 1,
	})
	@IsNumber()
	declare authorId: number;

	@ApiProperty({
		enum: ['done', 'ready', 'review', 'in progress'],
		description: 'Статус задачи',
		example: 'done',
	})
	@IsEnum({
		done: 'done',
		in_progress: 'in_progress',
		review: 'review',
		ready: 'ready',
	})
	declare status: TaskStatus;

	@ApiProperty({
		type: String,
		description: 'Текст задачи',
		example: 'Текс текст текст',
	})
	@IsString()
	declare content: string;

	@ApiProperty({
		type: String,
		description: 'Дата создания задачи',
		example: '2022-07-07',
	})
	@IsDate()
	declare createdAt: Date;
}