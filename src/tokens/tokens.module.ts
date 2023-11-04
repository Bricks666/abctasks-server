import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { TokensService } from './tokens.service';

@Module({
	imports: [JwtModule],
	providers: [TokensService],
	exports: [TokensService],
})
export class TokensModule {}
