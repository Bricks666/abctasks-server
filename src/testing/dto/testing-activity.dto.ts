import { ApiProperty } from '@nestjs/swagger';
import {
	IsISO8601,
	IsNumber,
	IsObject,
	IsOptional,
	IsString
} from 'class-validator';

import { TestingRoomDto } from './testing-room.dto';
import { TestingUserDto } from './testing-user.dto';

export class TestingActivityDto {
	@ApiProperty({
		description: 'Id активности',
		example: 1,
		type: Number,
		required: false,
	})
	@IsNumber()
	@IsOptional()
	declare id?: number;

	@ApiProperty({
		description: 'Id комнаты',
		example: 1,
		type: TestingRoomDto,
		required: false,
	})
	@IsObject()
	@IsOptional()
	declare room?: TestingRoomDto;

	@ApiProperty({
		type: String,
		description: 'Направление активности',
		required: false,
	})
	@IsString()
	@IsOptional()
	declare sphere?: string;

	@ApiProperty({
		type: String,
		description: 'Тип активности',
		required: false,
	})
	@IsString()
	@IsOptional()
	declare action?: string;

	@ApiProperty({
		description: 'Who made activity',
		type: TestingUserDto,
		required: false,
	})
	@IsObject()
	@IsOptional()
	declare activist?: TestingUserDto;

	@ApiProperty({
		type: String,
		description: 'When activity happened',
		example: new Date('2022-07-07'),
		required: false,
	})
	@IsISO8601()
	@IsOptional()
	declare createdAt?: Date;
}
