import { Module } from '@nestjs/common';
import { AuthModule } from '@/auth';
import { ActivitiesModule } from '@/activities';
import { RoomsModule } from '@/rooms';

import { GroupsService } from './services';
import { GroupsController } from './controllers';
import { GroupRepository } from './repositories';

@Module({
	imports: [AuthModule, ActivitiesModule, RoomsModule],
	providers: [GroupsService, GroupRepository],
	controllers: [GroupsController],
})
export class GroupsModule {}
