import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from '@/auth/auth.module';
import { DatabaseModule } from '@/database/database.module';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserRepository } from './repository';

@Module({
	imports: [forwardRef(() => AuthModule), DatabaseModule],
	providers: [UsersService, UserRepository],
	controllers: [UsersController],
	exports: [UsersService, UserRepository],
})
export class UsersModule {}
