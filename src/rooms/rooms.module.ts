import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { AuthModule } from '@/auth/auth.module';
import { DatabaseModule } from '@/database/database.module';
import { UsersModule } from '@/users/users.module';
import {
	RoomRedisRepository,
	RoomRepository,
	RoomUserRepository
} from './repository';

@Module({
	imports: [AuthModule, DatabaseModule, UsersModule],
	providers: [
		RoomsService,
		RoomUserRepository,
		RoomRepository,
		RoomRedisRepository
	],
	controllers: [RoomsController],
	exports: [RoomsService, RoomUserRepository, RoomRepository],
})
export class RoomsModule {}
