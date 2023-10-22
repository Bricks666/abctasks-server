import { Module } from '@nestjs/common';
import { AuthModule } from '@/auth/auth.module';
import { ActivitiesModule } from '@/activities/activities.module';
import { RoomsModule } from '@/rooms/rooms.module';

import { TaskRepository } from './repositories';
import { TasksService } from './services';
import { TasksController } from './controllers';

@Module({
	imports: [AuthModule, ActivitiesModule, RoomsModule],
	providers: [TasksService, TaskRepository],
	controllers: [TasksController],
	exports: [TasksService],
})
export class TasksModule {}
