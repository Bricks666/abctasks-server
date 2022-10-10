import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	ParseIntPipe,
	UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@/auth/auth.guard';
import { ActivitiesService } from './activities.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { Activity } from './models';

@Controller('activities')
export class ActivitiesController {
	constructor(private readonly activitiesService: ActivitiesService) {}

	@Get('/:roomId')
	findAll(@Param('roomId', ParseIntPipe) roomId: number): Promise<Activity[]> {
		return this.activitiesService.getActivities(roomId);
	}

	@Get('/:roomId/:id')
	findOne(
		@Param('roomId', ParseIntPipe) roomId: number,
		@Param('id', ParseIntPipe) id: number
	): Promise<Activity> {
		return this.activitiesService.getActivity(roomId, id);
	}

	@UseGuards(AuthGuard)
	@Post('/:roomId/create')
	create(
		@Param('roomId', ParseIntPipe) roomId: number,
		@Body() dto: CreateActivityDto
	) {
		return this.activitiesService.createActivity(roomId, dto);
	}
}
