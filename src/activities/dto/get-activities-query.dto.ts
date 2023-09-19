import { IntersectionType } from '@nestjs/swagger';
import { PaginationQueryDto, SortQueryDto } from '@/shared';
import { ActivitiesFiltersDto } from './activities-filters.dto';

export class GetActivitiesQueryDto extends IntersectionType(
	PaginationQueryDto,
	ActivitiesFiltersDto,
	SortQueryDto
) {}
