import { Module } from '@nestjs/common';
import { AuthModule } from '@/auth/auth.module';
import { RoomsModule } from '@/rooms';
import { DatabaseModule } from '@/database/database.module';
import { ActivitiesModule } from '@/activities/activities.module';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { CommentRepository } from './repository';

@Module({
	imports: [AuthModule, RoomsModule, DatabaseModule, ActivitiesModule],
	controllers: [CommentsController],
	providers: [CommentsService, CommentRepository],
})
export class CommentsModule {}
