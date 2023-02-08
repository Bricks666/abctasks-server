import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { ActivitiesService } from './activities.service';
import { ActivityDto, GetActivitiesQueryDto } from './dto';
import { ApiPaginatedResponse, PaginationResponseDto } from '@/common';

@ApiTags('Активности')
@ApiExtraModels(PaginationResponseDto, ActivityDto)
@Controller('activities')
export class ActivitiesController {
	constructor(private readonly activitiesService: ActivitiesService) {}

	@ApiPaginatedResponse(ActivityDto)
	@Get('/:roomId')
	getAll(
		@Param('roomId', ParseIntPipe) roomId: number,
		@Query() query: GetActivitiesQueryDto
	): Promise<PaginationResponseDto<ActivityDto>> {
		return this.activitiesService.getAllByRoomId({
			...query,
			roomId,
		});
	}
}
