import { Injectable } from '@nestjs/common';
import { TokensService } from '@/tokens/tokens.service';
import {
	GenerateRoomInvitationTokenParams,
	GeneratePersonalRoomInvitationTokenParams,
	RoomInvitationTokenPayload
} from './types';

@Injectable()
export class RoomInvitationsTokensService {
	constructor(private readonly tokensService: TokensService) {}

	generateInvitationToken(
		params: GenerateRoomInvitationTokenParams
	): Promise<string> {
		return this.tokensService.generateInsecure(params);
	}

	generatePersonalInvitationToken(
		params: GeneratePersonalRoomInvitationTokenParams
	): Promise<string> {
		return this.tokensService.generateInsecure(params);
	}

	verifyToken(token: string): Promise<RoomInvitationTokenPayload> {
		return this.tokensService.verifyInsecure(token);
	}
}
