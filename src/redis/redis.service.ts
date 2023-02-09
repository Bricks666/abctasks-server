import { Redis, RedisOptions } from 'ioredis';
import {
	Inject,
	Injectable,
	OnModuleDestroy,
	OnModuleInit
} from '@nestjs/common';
import { MODULE_OPTIONS_TOKEN } from './redis.module-definition';

@Injectable()
export class RedisService
	extends Redis
	implements OnModuleInit, OnModuleDestroy
{
	constructor(@Inject(MODULE_OPTIONS_TOKEN) options: RedisOptions) {
		console.log(options);
		super(options);
	}

	async onModuleInit() {
		await this.connect();
	}

	async onModuleDestroy() {
		this.disconnect();
	}
}
