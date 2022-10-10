import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { ActivitiesController } from './activities.controller';
import { ActivitiesService } from './activities.service';
import { Activity } from './models';
import { AuthModule } from '@/auth/auth.module';

@Module({
	imports: [SequelizeModule.forFeature([Activity]), AuthModule],
	controllers: [ActivitiesController],
	providers: [ActivitiesService],
})
export class ActivitiesModule {}
