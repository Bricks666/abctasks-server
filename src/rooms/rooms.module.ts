import { Module } from '@nestjs/common';
import { AuthModule } from '@/auth';

import { UsersModule } from '@/users';
import { RoomsController, RoomUserController } from './controllers';
import { RoomsService, RoomUserService } from './services';
import {
	RoomRedisRepository,
	RoomRepository,
	RoomUserRepository
} from './repositories';

@Module({
	imports: [AuthModule, UsersModule],
	providers: [
		RoomsService,
		RoomUserService,
		RoomUserRepository,
		RoomRepository,
		RoomRedisRepository
	],
	controllers: [RoomsController, RoomUserController],
	exports: [RoomsService, RoomUserService, RoomUserRepository, RoomRepository],
})
export class RoomsModule {}
