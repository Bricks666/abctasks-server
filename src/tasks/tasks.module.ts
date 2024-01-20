import { Module } from '@nestjs/common';
import { AuthModule } from '@/auth/auth.module';
import { ActivitiesModule } from '@/activities/activities.module';

import { MembersModule } from '@/members/members.module';
import { TaskRepository } from './repositories';
import { TasksService } from './services';
import { TasksController } from './controllers';

@Module({
	imports: [AuthModule, ActivitiesModule, MembersModule],
	providers: [TasksService, TaskRepository],
	controllers: [TasksController],
	exports: [TasksService],
})
export class TasksModule {}
