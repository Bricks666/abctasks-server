import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ActivitySphere } from '../entities';
import { ActivitySpheresService } from '../services';

@ApiTags('Сферы активностей')
@Controller('activities/spheres')
export class ActivitySpheresController {
	constructor(
		private readonly activitySpheresService: ActivitySpheresService
	) {}

	@ApiOperation({
		summary: 'Все сферы активностей',
	})
	@ApiOkResponse({
		type: ActivitySphere,
		isArray: true,
	})
	@Get('/all')
	getAll(): Promise<ActivitySphere[]> {
		return this.activitySpheresService.getAll();
	}
}
