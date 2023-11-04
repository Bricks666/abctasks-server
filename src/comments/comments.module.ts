import { Module } from '@nestjs/common';
import { ActivitiesModule } from '@/activities';
import { AuthModule } from '@/auth';

import { MembersModule } from '@/members/members.module';
import { CommentsController } from './controllers';
import { CommentsService } from './services';
import { CommentRepository } from './repositories';

@Module({
	imports: [AuthModule, MembersModule, ActivitiesModule],
	controllers: [CommentsController],
	providers: [CommentsService, CommentRepository],
})
export class CommentsModule {}
