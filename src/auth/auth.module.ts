import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '@/users/users.module';

@Module({
	imports: [JwtModule, forwardRef(() => UsersModule)],
	providers: [AuthService],
	controllers: [AuthController],
	exports: [AuthService, JwtModule],
})
export class AuthModule {}
