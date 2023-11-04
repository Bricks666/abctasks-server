import { Module, forwardRef } from '@nestjs/common';
import { AuthModule } from '@/auth';
import { UsersModule } from '@/users';
import { MembersModule } from '@/members/members.module';
import { RoomsController } from './controllers';
import { RoomsService } from './services';
import { RoomRepository } from './repositories';

@Module({
	imports: [AuthModule, UsersModule, forwardRef(() => MembersModule)],
	providers: [RoomsService, RoomRepository],
	controllers: [RoomsController],
	exports: [RoomsService],
})
export class RoomsModule {}
