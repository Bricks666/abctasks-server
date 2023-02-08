import {
	IsEnum,
	IsISO8601,
	IsNumber,
	IsOptional,
	IsString
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { ActivityAction } from './activity.dto';

export class ActivitiesFiltersDto {
	@ApiProperty({
		type: Number,
		required: false,
		description: 'Id активиста',
		example: 1,
	})
	@IsNumber()
	@Transform((a) => Number(a.value))
	@IsOptional()
	declare activistId?: number;

	@ApiProperty({
		type: String,
		required: false,
		description: 'Название сферы деятельности',
		example: 'comment',
	})
	@IsString()
	@IsOptional()
	declare sphereName?: string;

	@ApiProperty({
		enum: {
			create: 'create',
			update: 'update',
			remove: 'remove',
		},
		required: false,
		description: 'Произошедшее действие',
		example: 'create',
	})
	@IsEnum({
		create: 'create',
		update: 'update',
		remove: 'remove',
	})
	@IsOptional()
	declare action?: ActivityAction;

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
