import { ApiProperty } from '@nestjs/swagger';
import { Tag as TagModel } from '@prisma/client';
import { IsHexColor, IsNumber, IsString } from 'class-validator';
import { HEX } from '@/shared';

export class TagDto implements TagModel {
	@ApiProperty({
		description: 'Id тэга',
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
		description: 'Название тэга',
		example: 'Name',
		type: String,
	})
	@IsString()
	declare name: string;

	@ApiProperty({
		description: 'Основной цвет тэга',
		example: '#ffffff',
		type: String,
	})
	@IsHexColor()
	declare mainColor: HEX;

	@ApiProperty({
		description: 'Вторичный цвет тэга',
		example: '#ffffff',
		type: String,
	})
	@IsHexColor()
	declare secondColor: HEX;
}
