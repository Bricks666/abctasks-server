import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ActivityActionDto } from '../dto';
import { ActivityActionsService } from '../services';

@ApiTags('События активностей')
@Controller('activities/types')
export class ActivityActionsController {
	constructor(
		private readonly activityActionsService: ActivityActionsService
	) {}

	@ApiOperation({
		summary: 'Все события активностей',
	})
	@ApiOkResponse({
		type: ActivityActionDto,
		isArray: true,
	})
	@Get('/all')
	getAll(): Promise<ActivityActionDto[]> {
		return this.activityActionsService.getAll();
	}
}
