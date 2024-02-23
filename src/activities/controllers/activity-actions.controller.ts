import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ActivityAction } from '../entities';
import { ActivityActionsService } from '../services';

@ApiTags('События активностей')
@Controller('activities/actions')
export class ActivityActionsController {
	constructor(
		private readonly activityActionsService: ActivityActionsService
	) {}

	@ApiOperation({
		summary: 'All activity actions',
	})
	@ApiOkResponse({
		type: ActivityAction,
		isArray: true,
	})
	@Get('/all')
	getAll(): Promise<ActivityAction[]> {
		return this.activityActionsService.getAll();
	}
}
