import { Injectable } from '@nestjs/common';
import { TokensService } from '@/tokens/tokens.service';
import {
	GenerateLinkTokenParams,
	GenerateRoomInviteParams,
	RoomInviteToken,
	RoomLinkToken
} from './types';

@Injectable()
export class MembersTokensService {
	constructor(private readonly tokensService: TokensService) {}

	generateLinkToken(params: GenerateLinkTokenParams): Promise<string> {
		return this.tokensService.generateInsecure(params);
	}

	generateInviteToken(params: GenerateRoomInviteParams): Promise<string> {
		return this.tokensService.generateInsecure(params);
	}

	verifyToken(token: string): Promise<RoomInviteToken | RoomLinkToken> {
		return this.tokensService.verifyInsecure(token);
	}
}
