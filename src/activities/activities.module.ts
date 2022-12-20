import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { ActivitiesController } from './activities.controller';
import { ActivitiesService } from './activities.service';
import { Activity, ActivitySphere } from './models';
import { AuthModule } from '@/auth/auth.module';

@Module({
	imports: [SequelizeModule.forFeature([Activity, ActivitySphere]), AuthModule],
	controllers: [ActivitiesController],
	providers: [ActivitiesService],
	exports: [ActivitiesService],
})
export class ActivitiesModule {}
