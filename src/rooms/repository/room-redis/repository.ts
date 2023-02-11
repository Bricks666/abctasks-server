import { Injectable } from '@nestjs/common';
import { RedisService } from '@/redis';
import { HASH } from './config';
import {
	GetInviteHashParams,
	RemoveInviteHashParams,
	SetInviteHashParams
} from './types';

@Injectable()
export class Repository {
	constructor(private readonly redisService: RedisService) {}

	async getInviteHash(params: GetInviteHashParams): Promise<string | null> {
		const { roomId, } = params;

		const hash = await this.redisService.hget(HASH, roomId.toString());

		return hash ?? null;
	}

	async setInviteHash(params: SetInviteHashParams): Promise<void> {
		const { hash, roomId, } = params;

		await this.redisService.hset(HASH, { [roomId]: hash, });
	}

	async removeInviteHash(params: RemoveInviteHashParams): Promise<void> {
		const { roomId, } = params;
		await this.redisService.hdel(HASH, roomId.toString());
	}
}
