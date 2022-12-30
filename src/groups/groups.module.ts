import { Module } from '@nestjs/common';
import { AuthModule } from '@/auth/auth.module';
import { ActivitiesModule } from '@/activities/activities.module';
import { RoomsModule } from '@/rooms/rooms.module';
import { DatabaseModule } from '@/database/database.module';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import { GroupRepository } from './repository';

@Module({
	imports: [AuthModule, ActivitiesModule, RoomsModule, DatabaseModule],
	providers: [GroupsService, GroupRepository],
	controllers: [GroupsController],
})
export class GroupsModule {}
