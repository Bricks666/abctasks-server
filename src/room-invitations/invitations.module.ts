import { Module } from '@nestjs/common';
import { AuthModule } from '@/auth/auth.module';
import { MembersModule } from '@/members/members.module';
import { MailModule } from '@/mail/mail.module';
import { TokensModule } from '@/tokens/tokens.module';
import { RoomsModule } from '@/rooms/rooms.module';
import {
	RoomInvitationsService,
	RoomInvitationsTokensService
} from './services';
import { RoomInvitationsController } from './invitations.controller';
import { RoomInvitationsRepository } from './repositories';

@Module({
	imports: [AuthModule, MembersModule, MailModule, TokensModule, RoomsModule],
	controllers: [RoomInvitationsController],
	providers: [
		RoomInvitationsService,
		RoomInvitationsTokensService,
		RoomInvitationsRepository
	],
	exports: [RoomInvitationsService],
})
export class InvitationsModule {}
