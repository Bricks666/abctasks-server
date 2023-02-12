import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, Min } from 'class-validator';
import { NumberTransform } from '../lib';

export class PaginationQueryDto {
	@ApiProperty({
		type: Number,
		description: 'Страница',
		default: 1,
		example: 1,
		required: false,
	})
	@IsOptional()
	@IsNumber()
	@Min(1)
	@NumberTransform()
	declare page?: number;

	@ApiProperty({
		type: Number,
		description: 'Количество',
		default: 100,
		example: 150,
		required: false,
	})
	@IsNumber()
	@Min(1)
	@IsOptional()
	@NumberTransform()
	declare count?: number;
}
