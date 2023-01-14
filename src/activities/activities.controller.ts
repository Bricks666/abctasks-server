import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ItemsResponse } from '@/types';
import { ActivitiesService } from './activities.service';
import { ActivityDto, GetActivitiesQueryDto } from './dto';

@ApiTags('Активности')
@Controller('activities')
export class ActivitiesController {
	constructor(private readonly activitiesService: ActivitiesService) {}

	@Get('/:roomId')
	getAll(
		@Param('roomId', ParseIntPipe) roomId: number,
		@Query() query: GetActivitiesQueryDto
	): Promise<ItemsResponse<ActivityDto>> {
		return this.activitiesService.getAllByRoomId(roomId, query);
	}
}
