import { Module, forwardRef } from '@nestjs/common';
import { TokensModule } from '@/tokens/tokens.module';
import { RoomsModule } from '@/rooms/rooms.module';
import { MembersController } from './controllers';
import { MembersRepository } from './repositories';
import { MembersService } from './services';

@Module({
	imports: [TokensModule, forwardRef(() => RoomsModule)],
	controllers: [MembersController],
	providers: [MembersRepository, MembersService],
	exports: [MembersService],
})
export class MembersModule {}
