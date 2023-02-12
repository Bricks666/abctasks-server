import { Module } from '@nestjs/common';
import { AuthModule } from '@/auth';
import { DatabaseModule } from '@/database';
import { ActivitiesController } from './controllers';
import { ActivitiesService } from './services';
import { ActivityRepository } from './repositories';

@Module({
	imports: [AuthModule, DatabaseModule],
	controllers: [ActivitiesController],
	providers: [ActivitiesService, ActivityRepository],
	exports: [ActivitiesService, ActivityRepository],
})
export class ActivitiesModule {}
