import {
	Controller,
	Get,
	Param,
	ParseIntPipe,
	UseInterceptors,
	CacheInterceptor
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ActivitiesService } from './activities.service';
import { ActivityDto } from './dto';

@ApiTags('Активности')
@Controller('activities')
export class ActivitiesController {
	constructor(private readonly activitiesService: ActivitiesService) {}

	@UseInterceptors(CacheInterceptor)
	@Get('/:roomId')
	getAll(
		@Param('roomId', ParseIntPipe) roomId: number
	): Promise<ActivityDto[]> {
		return this.activitiesService.getAllByRoomId(roomId);
	}
}
