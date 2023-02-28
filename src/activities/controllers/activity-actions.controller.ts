import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ActivitySphereDto } from '../dto';
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
		type: ActivitySphereDto,
		isArray: true,
	})
	@Get('')
	getAll(): Promise<ActivitySphereDto[]> {
		return this.activitySpheresService.getAll();
	}
}
