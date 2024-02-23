import { IsISO8601, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { NumberTransform } from '@/shared';

export class ActivitiesFiltersRequestDto {
	@ApiProperty({
		type: Number,
		isArray: true,
		required: false,
		description: 'User ids who made activity',
		example: [1],
	})
	@IsNumber({}, { each: true, })
	@IsOptional()
	@NumberTransform()
	declare activistIds?: number[];

	@ApiProperty({
		type: Number,
		isArray: true,
		required: false,
		description: 'Sphere ids',
		example: [1],
	})
	@IsNumber({}, { each: true, })
	@IsOptional()
	@NumberTransform()
	declare sphereIds?: number[];

	@ApiProperty({
		type: Number,
		isArray: true,
		required: false,
		description: 'Action ids',
		example: [1],
	})
	@IsNumber({}, { each: true, })
	@IsOptional()
	@NumberTransform()
	declare actionIds?: number[];

	@ApiProperty({
		type: String,
		required: false,
		description: 'ISO8601 formatted date before which activity happened',
		example: '2022-12-15T00:00:00.000Z',
	})
	@IsISO8601()
	@IsOptional()
	declare before?: string;

	@ApiProperty({
		type: String,
		required: false,
		description: 'ISO8601 formatted date after which activity happened',
		example: '2022-12-15T00:00:00.000Z',
	})
	@IsISO8601()
	@IsOptional()
	declare after?: string;
}
