import { Module } from '@nestjs/common';
import { AuthModule } from '@/auth/auth.module';

import {
	ActivitiesController,
	ActivityActionsController,
	ActivitySpheresController
} from './controllers';
import {
	ActivitiesService,
	ActivityActionsService,
	ActivitySpheresService
} from './services';
import {
	ActivityActionRepository,
	ActivityRepository,
	ActivitySphereRepository
} from './repositories';

@Module({
	imports: [AuthModule],
	controllers: [
		ActivitiesController,
		ActivityActionsController,
		ActivitySpheresController
	],
	providers: [
		ActivitiesService,
		ActivityRepository,
		ActivitySphereRepository,
		ActivityActionRepository,
		ActivitySpheresService,
		ActivityActionsService
	],
	exports: [ActivitiesService, ActivityRepository],
})
export class ActivitiesModule {}
