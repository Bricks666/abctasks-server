import { Module } from '@nestjs/common';
import { AuthModule } from '@/auth';
import { MailModule } from '@/mail';
import { UsersModule } from '@/users';
import { TokensModule } from '@/tokens/tokens.module';
import { RoomsController, RoomUserController } from './controllers';
import { RoomsService, RoomTokensService, RoomUserService } from './services';
import { RoomRepository, RoomUserRepository } from './repositories';

@Module({
	imports: [AuthModule, UsersModule, MailModule, TokensModule],
	providers: [
		RoomsService,
		RoomUserService,
		RoomUserRepository,
		RoomRepository,
		RoomTokensService
	],
	controllers: [RoomsController, RoomUserController],
	exports: [RoomsService, RoomUserService, RoomUserRepository, RoomRepository],
})
export class RoomsModule {}
