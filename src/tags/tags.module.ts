import { Module } from '@nestjs/common';
import { AuthModule } from '@/auth';
import { ActivitiesModule } from '@/activities';
import { RoomsModule } from '@/rooms';

import { TagsService } from './services';
import { TagsController } from './controllers';
import { TagRepository } from './repositories';

@Module({
	imports: [AuthModule, ActivitiesModule, RoomsModule],
	providers: [TagsService, TagRepository],
	controllers: [TagsController],
})
export class TagsModule {}
