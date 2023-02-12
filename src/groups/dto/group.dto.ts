import { ApiProperty } from '@nestjs/swagger';
import { group as GroupModel } from '@prisma/client';
import { IsHexColor, IsNumber, IsString } from 'class-validator';
import { HEX } from '@/shared';

export class GroupDto implements GroupModel {
	@ApiProperty({
		description: 'Id группы',
		example: 1,
		type: Number,
	})
	@IsNumber()
	declare id: number;

	@ApiProperty({
		description: 'Id комнаты',
		example: 1,
		type: Number,
	})
	@IsNumber()
	declare roomId: number;

	@ApiProperty({
		description: 'Id группы',
		example: 'Name',
		type: String,
	})
	@IsString()
	declare name: string;

	@ApiProperty({
		description: 'Основной цвет группы',
		example: '#ffffff',
		type: String,
	})
	@IsHexColor()
	declare mainColor: HEX;

	@ApiProperty({
		description: 'Вторичный цвет группы',
		example: '#ffffff',
		type: String,
	})
	@IsHexColor()
	declare secondColor: HEX;
}
