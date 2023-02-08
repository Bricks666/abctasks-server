import { IntersectionType } from '@nestjs/swagger';
import { PaginationQueryDto } from '@/common';
import { ActivitiesFiltersDto } from './activities-filters.dto';

export class GetActivitiesQueryDto extends IntersectionType(
	PaginationQueryDto,
	ActivitiesFiltersDto
) {}
