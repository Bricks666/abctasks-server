import { Injectable } from '@nestjs/common';
import { TokensService } from '@/tokens/tokens.service';
import { GenerateTokenParams, UserToken } from './types';

@Injectable()
export class AuthTokensService {
	constructor(private readonly tokensService: TokensService) {}

	generateAccessToken(params: GenerateTokenParams): Promise<string> {
		return this.tokensService.generateSecure(params, '15m');
	}

	generateRefreshToken(params: GenerateTokenParams): Promise<string> {
		return this.tokensService.generateSecure(params, '30d');
	}

	verifyToken(token: string): Promise<UserToken> {
		return this.tokensService.verifySecure(token);
	}
}
