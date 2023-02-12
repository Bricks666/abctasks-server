import { Module } from '@nestjs/common';
import { AuthModule } from '@/auth';
import { ActivitiesModule } from '@/activities';
import { RoomsModule } from '@/rooms';
import { DatabaseModule } from '@/database';
import { TasksController } from './controllers';
import { TasksService } from './services';
import { TaskRepository } from './repositories';

@Module({
	imports: [AuthModule, ActivitiesModule, RoomsModule, DatabaseModule],
	providers: [TasksService, TaskRepository],
	controllers: [TasksController],
})
export class TasksModule {}
