import { Controller, Get, Query } from '@nestjs/common';
import { ApiExtraModels, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
	ApiPaginatedResponse,
	IntParam,
	PaginationResponseDto
} from '@/shared';
import { DisableAuthCheck } from '@/auth';
import { ActivityDto, GetActivitiesQueryDto } from '../dto';
import { ActivitiesService } from '../services';

@ApiTags('Активности')
@ApiExtraModels(PaginationResponseDto, ActivityDto)
@Controller('activities')
export class ActivitiesController {
	constructor(private readonly activitiesService: ActivitiesService) {}

	@ApiOperation({
		summary: 'Получение активностей в комнате',
	})
	@ApiPaginatedResponse(ActivityDto)
	@DisableAuthCheck()
	@Get('/:roomId')
	getAll(
		@IntParam('roomId') roomId: number,
		@Query() query: GetActivitiesQueryDto
	): Promise<PaginationResponseDto<ActivityDto>> {
		return this.activitiesService.getAllByRoomId({
			...query,
			roomId,
		});
	}
}
