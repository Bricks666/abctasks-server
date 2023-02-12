import { Module } from '@nestjs/common';
import { AuthModule } from '@/auth';

import { ActivitiesController } from './controllers';
import { ActivitiesService } from './services';
import { ActivityRepository } from './repositories';

@Module({
	imports: [AuthModule],
	controllers: [ActivitiesController],
	providers: [ActivitiesService, ActivityRepository],
	exports: [ActivitiesService, ActivityRepository],
})
export class ActivitiesModule {}
