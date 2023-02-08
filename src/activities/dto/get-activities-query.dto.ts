import { IntersectionType } from '@nestjs/swagger';
import { PaginationQueryDto, SortQueryDto } from '@/common';
import { ActivitiesFiltersDto } from './activities-filters.dto';

export class GetActivitiesQueryDto extends IntersectionType(
	IntersectionType(PaginationQueryDto, ActivitiesFiltersDto),
	SortQueryDto
) {}
