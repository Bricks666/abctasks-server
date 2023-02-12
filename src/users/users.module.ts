import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from '@/auth';
import { DatabaseModule } from '@/database';
import { UsersService } from './services';
import { UsersController } from './controllers';
import { UserRepository } from './repositories';

@Module({
	imports: [forwardRef(() => AuthModule), DatabaseModule],
	providers: [UsersService, UserRepository],
	controllers: [UsersController],
	exports: [UsersService, UserRepository],
})
export class UsersModule {}
