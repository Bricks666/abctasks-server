import {
	IsDateString,
	IsEnum,
	IsNumber,
	IsOptional,
	IsString
} from 'class-validator';
import { Transform } from 'class-transformer';
import { PaginationQueryDto } from '@/common';
import { ActivityAction } from './activity.dto';

export class GetActivitiesQueryDto extends PaginationQueryDto {
	@IsNumber()
	@Transform((a) => Number(a.value))
	@IsOptional()
	declare activistId?: number;

	@IsString()
	@IsOptional()
	declare sphereName?: string;

	@IsEnum({
		create: 'create',
		update: 'update',
		remove: 'remove',
	})
	@IsOptional()
	declare action?: ActivityAction;

	@IsDateString()
	@IsOptional()
	declare before?: string;

	@IsDateString()
	@IsOptional()
	declare after?: string;
}
