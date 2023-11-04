import { Module, forwardRef } from '@nestjs/common';
import { TokensModule } from '@/tokens/tokens.module';
import { MailModule } from '@/mail/mail.module';
import { RoomsModule } from '@/rooms/rooms.module';
import { MembersController } from './controllers';
import { MembersRepository } from './repositories';
import { MembersService, MembersTokensService } from './services';

@Module({
	imports: [TokensModule, MailModule, forwardRef(() => RoomsModule)],
	controllers: [MembersController],
	providers: [MembersRepository, MembersService, MembersTokensService],
	exports: [MembersService],
})
export class MembersModule {}
