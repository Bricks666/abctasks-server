import { IntersectionType } from '@nestjs/swagger';
import { SortQueryDto } from '@/shared';
import { TasksFiltersDto } from './tasks-filters.dto';

export class GetTasksDto extends IntersectionType(
	TasksFiltersDto,
	SortQueryDto
) {}
