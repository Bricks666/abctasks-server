import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { AuthModule } from '@/auth/auth.module';
import { DatabaseModule } from '@/database/database.module';
import { RoomRepository, RoomUserRepository } from './repository';
import { UsersModule } from '@/users/users.module';

@Module({
	imports: [AuthModule, DatabaseModule, UsersModule],
	providers: [RoomsService, RoomRepository, RoomUserRepository],
	controllers: [RoomsController],
	exports: [RoomsService, RoomRepository, RoomUserRepository],
})
export class RoomsModule {}
