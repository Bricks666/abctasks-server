import { Task as TaskModel, TaskStatus } from '@prisma/client';
import {
	IsISO8601,
	IsEnum,
	IsNumber,
	IsOptional,
	IsString,
	MaxLength,
	IsObject
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TagDto } from '@/tags/dto';
import { SecurityUserDto } from '@/users/dto';

export class TaskDto implements Omit<TaskModel, 'tagIds' | 'authorId'> {
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
		type: TagDto,
		isArray: true,
		description: 'Tags',
	})
	@IsObject({
		each: true,
	})
	declare tags: TagDto[];

	declare authorId: number;

	@ApiProperty({
		type: SecurityUserDto,
		description: 'Автор',
	})
	@IsObject()
	declare author: number;

	@ApiProperty({
		type: String,
		description: 'Заголовок задачи',
		example: 'Некоторый заголовок задачи',
	})
	@IsString()
	@MaxLength(32)
	declare title: string;

	@ApiProperty({
		type: String,
		description: 'Текст задачи',
		example: 'Текс текст текст',
		nullable: true,
	})
	@IsOptional()
	@IsString()
	@MaxLength(255)
	declare description: string;

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
		description: 'Дата создания задачи',
		example: '2022-07-07',
	})
	@IsISO8601()
	declare createdAt: Date;

	@ApiProperty({
		type: String,
		description: 'Дата обновления',
		example: '2022-07-07',
	})
	@IsISO8601()
	declare updatedAt: Date;
}
