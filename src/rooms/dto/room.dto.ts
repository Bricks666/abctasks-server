import { ApiProperty } from '@nestjs/swagger';
import { room as RoomModel } from '@prisma/client';
import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

export class RoomDto implements RoomModel {
	@ApiProperty({
		example: 1,
		description: 'Id комнаты',
		type: Number,
	})
	@IsNumber({})
	declare id: number;

	@ApiProperty({
		example: 'Room name',
		description: 'Имя комнаты',
		type: String,
	})
	@IsString({})
	declare name: string;

	@ApiProperty({
		example: 'Room description',
		description: 'Описание комнаты',
		type: String,
	})
	@IsString({})
	declare description: string;

	@IsDateString()
	declare createdAt: Date;

	@IsDateString()
	@IsOptional()
	declare updatedAt: Date;
}
