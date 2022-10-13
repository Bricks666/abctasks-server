import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	ParseIntPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ActivitiesService } from './activities.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { Activity } from './models';
import { Auth } from '@/decorators/auth.decorator';

@ApiTags('Активности')
@Controller('activities')
export class ActivitiesController {
	constructor(private readonly activitiesService: ActivitiesService) {}

	@Get('/:roomId')
	getAll(@Param('roomId', ParseIntPipe) roomId: number): Promise<Activity[]> {
		return this.activitiesService.getAll(roomId);
	}

	@Get('/:roomId/:id')
	getOne(
		@Param('roomId', ParseIntPipe) roomId: number,
		@Param('id', ParseIntPipe) id: number
	): Promise<Activity> {
		return this.activitiesService.getOne(roomId, id);
	}

	@Auth()
	@Post('/:roomId/create')
	create(
		@Param('roomId', ParseIntPipe) roomId: number,
		@Body() dto: CreateActivityDto
	) {
		return this.activitiesService.create(roomId, dto);
	}
}
