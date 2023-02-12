import { Module } from '@nestjs/common';
import { AuthModule } from '@/auth/auth.module';
import { DatabaseModule } from '@/database/database.module';
import { UsersModule } from '@/users/users.module';
import { RoomsController, RoomUserController } from './controllers';
import { RoomsService, RoomUserService } from './services';
import {
	RoomRedisRepository,
	RoomRepository,
	RoomUserRepository
} from './repositories';

@Module({
	imports: [AuthModule, DatabaseModule, UsersModule],
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
