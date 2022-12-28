import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { Comment } from './models';
import { AuthModule } from '@/auth/auth.module';
import { RoomsModule } from '@/rooms/rooms.module';

@Module({
	imports: [SequelizeModule.forFeature([Comment]), AuthModule, RoomsModule],
	controllers: [CommentsController],
	providers: [CommentsService],
})
export class CommentsModule {}
