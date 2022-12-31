import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthModule } from '@/auth/auth.module';
import { DatabaseModule } from '@/database/database.module';
import { UserRepository } from './repository';

@Module({
	imports: [forwardRef(() => AuthModule), DatabaseModule],
	providers: [UsersService, UserRepository],
	controllers: [UsersController],
	exports: [UsersService, UserRepository],
})
export class UsersModule {}
