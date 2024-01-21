import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsOptional } from 'class-validator';
import { NumberTransform } from '@/shared';

export class TestingRoomDto {
	@ApiProperty({
		example: 1,
		description: 'Id комнаты',
		type: Number,
		required: false,
	})
	@NumberTransform()
	@IsNumber({})
	@IsOptional()
	declare id?: number;

	@ApiProperty({
		example: 1,
		description: 'ID создателя комнаты',
		type: Number,
		required: false,
	})
	@NumberTransform()
	@IsNumber()
	@IsOptional()
	declare ownerId?: number;

	@ApiProperty({
		example: 'Room name',
		description: 'Имя комнаты',
		type: String,
		required: false,
	})
	@IsString()
	@IsOptional()
	declare name?: string;

	@ApiProperty({
		example: 'Room description',
		description: 'Описание комнаты',
		type: String,
		required: false,
	})
	@IsString()
	@IsOptional()
	declare description?: string;
}
