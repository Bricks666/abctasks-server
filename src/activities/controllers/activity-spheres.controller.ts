import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DisableAuthCheck } from '@/auth';
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
	@DisableAuthCheck()
	@Get('/all')
	getAll(): Promise<ActivitySphereDto[]> {
		return this.activitySpheresService.getAll();
	}
}
