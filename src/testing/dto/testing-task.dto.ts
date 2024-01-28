import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus } from '@prisma/client';
import {
	IsNumber,
	IsObject,
	IsString,
	MaxLength,
	IsOptional,
	IsEnum,
	IsISO8601
} from 'class-validator';
import { TestingTagDto } from './testing-tag.dto';
import { TestingUserDto } from './testing-user.dto';
import { TestingRoomDto } from './testing-room.dto';

export class TestingTaskDto {
	@ApiProperty({
		type: Number,
		description: 'Id задачи',
		example: 1,
		required: false,
	})
	@IsNumber()
	@IsOptional()
	declare id?: number;

	@ApiProperty({
		type: TestingRoomDto,
		description: 'Id комнаты',
		required: false,
	})
	@IsObject()
	@IsOptional()
	declare room?: TestingRoomDto;

	@ApiProperty({
		type: TestingTagDto,
		isArray: true,
		description: 'Tags',
		required: false,
	})
	@IsOptional()
	@IsObject({
		each: true,
	})
	declare tags?: TestingTagDto[];

	@ApiProperty({
		type: TestingUserDto,
		description: 'Author id',
		required: false,
	})
	@IsObject()
	@IsOptional()
	declare author?: TestingUserDto;

	@ApiProperty({
		type: String,
		description: 'Заголовок задачи',
		example: 'Некоторый заголовок задачи',
		required: false,
	})
	@IsString()
	@MaxLength(32)
	@IsOptional()
	declare title?: string;

	@ApiProperty({
		type: String,
		description: 'Текст задачи',
		example: 'Текс текст текст',
		nullable: true,
		required: false,
	})
	@IsOptional()
	@IsString()
	@MaxLength(255)
	declare description?: string;

	@ApiProperty({
		enum: ['done', 'ready', 'review', 'in progress'],
		description: 'Статус задачи',
		example: 'done',
		required: false,
	})
	@IsEnum({
		done: 'done',
		in_progress: 'in_progress',
		review: 'review',
		ready: 'ready',
	})
	@IsOptional()
	declare status?: TaskStatus;

	@ApiProperty({
		type: String,
		description: 'Дата создания задачи',
		example: new Date('2022-07-07'),
		required: false,
	})
	@IsISO8601()
	@IsOptional()
	declare createdAt?: Date;

	@ApiProperty({
		type: String,
		description: 'Дата обновления',
		example: new Date('2022-07-07'),
		required: false,
	})
	@IsISO8601()
	@IsOptional()
	declare updatedAt?: Date;
}
