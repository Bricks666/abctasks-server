import { APP_GUARD } from '@nestjs/core';
import { CacheModule, CacheStore, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RedisClientOptions } from 'redis';
import { redisStore } from 'cache-manager-redis-store';
import { UsersModule } from '@/users';
import { RoomsModule } from '@/rooms';
import { TasksModule } from '@/tasks';
import { TagsModule } from '@/tags';
import { ActivitiesModule } from '@/activities';
import { AuthGuard, AuthModule, IsActivatedGuard } from '@/auth';
import { ProgressModule } from '@/progress';
import { CommentsModule } from '@/comments';
import { DatabaseModule } from '@/database';
import { MailModule } from '@/mail';

@Module({
	imports: [
		CacheModule.register<RedisClientOptions>({
			store: redisStore as unknown as CacheStore,
			isGlobal: true,
			max: 50,
			url: process.env.REDIS_URL,
		}),
		ConfigModule.forRoot({
			envFilePath: '.env',
		}),
		DatabaseModule.forRoot({}),
		AuthModule,
		UsersModule,
		RoomsModule,
		TasksModule,
		TagsModule,
		ActivitiesModule,
		ProgressModule,
		CommentsModule,
		MailModule
	],
	providers: [
		{
			provide: APP_GUARD,
			useClass: AuthGuard,
		},
		{
			provide: APP_GUARD,
			useClass: IsActivatedGuard,
		}
	],
})
export class AppModule {}
