import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit {
	constructor() {
		super({
			log: [
				{
					emit: 'event',
					level: 'query',
				},
				{
					emit: 'stdout',
					level: 'error',
				},
				{
					emit: 'stdout',
					level: 'info',
				},
				{
					emit: 'stdout',
					level: 'warn',
				}
			],
		});
	}

	async onModuleInit() {
		await this.$connect();

		this.$on('query' as any, (e: Record<string, any>) => {
			console.log(`Query: ${e.query}`);
			console.log(`Params: ${e.params}`);
			console.log(`Duration: ${e.duration}ms`);
		});
	}

	async enableShutdownHooks(app: INestApplication) {
		this.$on('beforeExit', async () => {
			await app.close();
		});
	}
}
