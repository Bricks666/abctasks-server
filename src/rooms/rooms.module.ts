import { Module } from '@nestjs/common';
import { AuthModule } from '@/auth';
import { MailModule } from '@/mail';
import { UsersModule } from '@/users';
import { RoomsController, RoomUserController } from './controllers';
import { RoomsService, RoomUserService } from './services';
import { RoomRepository, RoomUserRepository } from './repositories';

@Module({
	imports: [AuthModule, UsersModule, MailModule],
	providers: [
		RoomsService,
		RoomUserService,
		RoomUserRepository,
		RoomRepository
	],
	controllers: [RoomsController, RoomUserController],
	exports: [RoomsService, RoomUserService, RoomUserRepository, RoomRepository],
})
export class RoomsModule {}
