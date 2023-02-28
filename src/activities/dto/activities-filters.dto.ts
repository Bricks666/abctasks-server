import { IsISO8601, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { NumberTransform } from '@/shared';

export class ActivitiesFiltersDto {
	@ApiProperty({
		type: Number,
		isArray: true,
		required: false,
		description: 'Id активиста',
		example: [1],
	})
	@IsNumber()
	@IsOptional()
	@NumberTransform()
	declare activistIds?: number[];

	@ApiProperty({
		type: Number,
		isArray: true,
		required: false,
		description: 'Id сферы деятельности',
		example: [1],
	})
	@IsNumber({}, { each: true, })
	@IsOptional()
	declare sphereIds?: number[];

	@ApiProperty({
		type: Number,
		isArray: true,
		required: false,
		description: 'Id Произошедшего действия',
		example: [1],
	})
	@IsNumber({}, { each: true, })
	@IsOptional()
	declare actionIds?: number[];

	@ApiProperty({
		type: String,
		required: false,
		description:
			'Дата и время в формате ISO8601, активности до которой включительно ищутся',
		example: '2022-12-15T00:00:00.000Z',
	})
	@IsISO8601()
	@IsOptional()
	declare before?: string;

	@ApiProperty({
		type: String,
		required: false,
		description:
			'Дата и время в формате ISO8601, активности после которой включительно ищутся',
		example: '2022-12-15T00:00:00.000Z',
	})
	@IsISO8601()
	@IsOptional()
	declare after?: string;
}
