import { IntersectionType } from '@nestjs/swagger';
import { SortedRequestDto } from '@/shared';
import { TasksFiltersDto } from './tasks-filters.dto';

export class GetTasksDto extends IntersectionType(
	TasksFiltersDto,
	SortedRequestDto
) {}
