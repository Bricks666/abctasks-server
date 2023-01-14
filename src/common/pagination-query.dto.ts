import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, Min } from 'class-validator';

export class PaginationQueryDto {
	@ApiProperty({
		type: Number,
		description: 'Страница',
		default: 1,
		example: 2,
		required: false,
	})
	@Transform(({ value, }) => Number(value))
	@IsOptional()
	@IsNumber()
	@Min(1)
	declare page?: number;

	@ApiProperty({
		type: Number,
		description: 'Количество',
		default: 100,
		example: 150,
		required: false,
	})
	@Transform(({ value, }) => Number(value))
	@IsNumber()
	@Min(1)
	@IsOptional()
	declare count?: number;
}
