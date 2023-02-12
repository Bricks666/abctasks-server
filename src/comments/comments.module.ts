import { Module } from '@nestjs/common';
import { ActivitiesModule } from '@/activities';
import { AuthModule } from '@/auth';
import { RoomsModule } from '@/rooms';
import { DatabaseModule } from '@/database';
import { CommentsController } from './controllers';
import { CommentsService } from './services';
import { CommentRepository } from './repositories';

@Module({
	imports: [AuthModule, RoomsModule, DatabaseModule, ActivitiesModule],
	controllers: [CommentsController],
	providers: [CommentsService, CommentRepository],
})
export class CommentsModule {}
