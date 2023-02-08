import { IntersectionType } from '@nestjs/swagger';
import { SortQueryDto } from '@/common';
import { TasksFiltersDto } from './tasks-filters.dto';

export class GetTasksDto extends IntersectionType(
	TasksFiltersDto,
	SortQueryDto
) {}
