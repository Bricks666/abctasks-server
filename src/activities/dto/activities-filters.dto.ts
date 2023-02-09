import {
	IsEnum,
	IsISO8601,
	IsNumber,
	IsOptional,
	IsString
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { NumberTransform } from '@/common';
import { ActivityAction } from './activity.dto';

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
	declare activistId?: number[];

	@ApiProperty({
		type: String,
		isArray: true,
		required: false,
		description: 'Название сферы деятельности',
		example: ['comment'],
	})
	@IsString({ each: true, })
	@IsOptional()
	declare sphereName?: string[];

	@ApiProperty({
		enum: {
			create: 'create',
			update: 'update',
			remove: 'remove',
		},
		isArray: true,
		required: false,
		description: 'Произошедшее действие',
		example: ['create'],
	})
	@IsEnum(
		{
			create: 'create',
			update: 'update',
			remove: 'remove',
		},
		{ each: true, }
	)
	@IsOptional()
	declare action?: ActivityAction[];

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
