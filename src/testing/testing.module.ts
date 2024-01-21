import { Module } from '@nestjs/common';
import { TokensModule } from '@/tokens/tokens.module';
import { TestingService } from './testing.service';
import { TestingController } from './testing.controller';

@Module({
	imports: [TokensModule],
	controllers: [TestingController],
	providers: [TestingService],
	exports: [TestingService],
})
export class TestingModule {}
