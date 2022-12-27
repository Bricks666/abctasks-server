import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min } from 'class-validator';

export class PaginationQueryDto {
	@ApiProperty({
		type: Number,
		description: 'Страница',
		default: 1,
		example: 2,
		required: false,
	})
	@IsNumber()
	@Min(1)
	declare page?: number;

	@IsNumber()
	@Min(1)
	@ApiProperty({
		type: Number,
		description: 'Количество',
		default: 100,
		example: 150,
		required: false,
	})
	declare count?: number;
}
