import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '@/users';
import { MailModule } from '@/mail';
import { AuthService } from './services';
import { AuthController } from './controllers';

@Module({
	imports: [JwtModule, forwardRef(() => UsersModule), MailModule],
	providers: [AuthService],
	controllers: [AuthController],
	exports: [AuthService, JwtModule],
})
export class AuthModule {}
