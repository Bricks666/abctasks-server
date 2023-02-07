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
		example: 1,
		description: 'ID создателя комнаты',
		type: Number,
	})
	@IsNumber()
	declare creatorId: number;

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
	@IsString()
	declare description: string;

	@ApiProperty({
		example: true,
		description: 'Может ли пользователь изменять состояние комнаты',
		type: Boolean,
	})
	declare canChange: boolean;

	@IsDateString()
	declare createdAt: Date;

	@IsDateString()
	@IsOptional()
	declare updatedAt: Date;
}
