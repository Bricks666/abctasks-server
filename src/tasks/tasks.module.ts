import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { Task } from './models';
import { AuthModule } from '@/auth/auth.module';
import { ActivitiesModule } from '@/activities/activities.module';
import { TasksGateway } from './tasks.gateway';

@Module({
	imports: [SequelizeModule.forFeature([Task]), AuthModule, ActivitiesModule],
	providers: [TasksService, TasksGateway],
	controllers: [TasksController],
})
export class TasksModule {}
