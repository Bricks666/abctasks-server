import { ApiProperty } from '@nestjs/swagger';
import {
	IsHexColor,
	IsNumber,
	IsObject,
	IsOptional,
	IsString
} from 'class-validator';
import { HEX } from '@/shared';
import { TestingRoomDto } from './testing-room.dto';

export class TestingTagDto {
	@ApiProperty({
		description: 'Id тэга',
		example: 1,
		type: Number,
		required: false,
	})
	@IsNumber()
	@IsOptional()
	declare id?: number;

	@ApiProperty({
		description: 'Room',
		type: TestingRoomDto,
		required: false,
	})
	@IsObject()
	@IsOptional()
	declare room?: TestingRoomDto;

	@ApiProperty({
		description: 'Название тэга',
		example: 'Name',
		type: String,
		required: false,
	})
	@IsString()
	@IsOptional()
	declare name?: string;

	@ApiProperty({
		description: 'Основной цвет тэга',
		example: '#ffffff',
		type: String,
		required: false,
	})
	@IsHexColor()
	@IsOptional()
	declare mainColor?: HEX;

	@ApiProperty({
		description: 'Вторичный цвет тэга',
		example: '#000000',
		type: String,
		required: false,
	})
	@IsHexColor()
	@IsOptional()
	declare secondColor?: HEX;
}
