import { Module } from '@nestjs/common';
import { AuthModule } from '@/auth/auth.module';
import { DatabaseModule } from '@/database/database.module';
import { ActivitiesController } from './activities.controller';
import { ActivitiesService } from './activities.service';
import { ActivityRepository } from './repository';

@Module({
	imports: [AuthModule, DatabaseModule],
	controllers: [ActivitiesController],
	providers: [ActivitiesService, ActivityRepository],
	exports: [ActivitiesService, ActivityRepository],
})
export class ActivitiesModule {}
