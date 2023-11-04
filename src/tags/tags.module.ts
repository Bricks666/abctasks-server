import { Module } from '@nestjs/common';
import { AuthModule } from '@/auth/auth.module';
import { ActivitiesModule } from '@/activities/activities.module';
import { TasksModule } from '@/tasks/tasks.module';

import { MembersModule } from '@/members/members.module';
import { TagRepository } from './repositories';
import { TagsService } from './services';
import { TagsController } from './controllers';

@Module({
	imports: [TasksModule, AuthModule, ActivitiesModule, MembersModule],
	providers: [TagRepository, TagsService],
	controllers: [TagsController],
})
export class TagsModule {}
