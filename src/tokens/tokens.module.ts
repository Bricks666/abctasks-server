import { Module } from '@nestjs/common';
import { TokensService } from './tokens.service';

@Module({
	providers: [TokensService],
	imports: [TokensService],
})
export class TokensModule {}
