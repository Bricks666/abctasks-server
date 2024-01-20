import { forwardRef, Module } from '@nestjs/common';
import { TokensModule } from '@/tokens/tokens.module';
import { UsersModule } from '@/users';
import { MailModule } from '@/mail';
import { AuthService, AuthTokensService } from './services';
import { AuthController } from './controllers';

@Module({
	imports: [TokensModule, forwardRef(() => UsersModule), MailModule],
	providers: [AuthService, AuthTokensService],
	controllers: [AuthController],
	exports: [AuthService, AuthTokensService],
})
export class AuthModule {}
