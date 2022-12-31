import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { AuthModule } from '@/auth/auth.module';
import { ActivitiesModule } from '@/activities/activities.module';
import { TasksGateway } from './tasks.gateway';
import { RoomsModule } from '@/rooms/rooms.module';
import { DatabaseModule } from '@/database/database.module';
import { TaskRepository } from './repository';

@Module({
	imports: [AuthModule, ActivitiesModule, RoomsModule, DatabaseModule],
	providers: [TasksService, TasksGateway, TaskRepository],
	controllers: [TasksController],
})
export class TasksModule {}
