import { Injectable } from '@nestjs/common';
import { TokensService } from '@/tokens/tokens.service';
import {
	GenerateLinkTokenParams,
	GenerateRoomInviteParams,
	RoomInviteToken,
	RoomLinkToken
} from './types';

@Injectable()
export class RoomTokensService {
	constructor(private readonly tokensService: TokensService) {}

	generateLinkToken(params: GenerateLinkTokenParams): Promise<string> {
		return this.tokensService.generateInsecure(params);
	}

	verifyLinkToken(token: string): Promise<RoomLinkToken> {
		return this.tokensService.verifyInsecure(token);
	}

	generateInviteToken(params: GenerateRoomInviteParams): Promise<string> {
		return this.tokensService.generateInsecure(params);
	}

	verifyInviteToken(token: string): Promise<RoomInviteToken> {
		return this.tokensService.verifyInsecure(token);
	}
}
