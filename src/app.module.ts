import { APP_GUARD } from '@nestjs/core';
import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from '@/users';
import { RoomsModule } from '@/rooms';
import { TasksModule } from '@/tasks';
import { TagsModule } from '@/tags';
import { ActivitiesModule } from '@/activities';
import { AuthGuard, AuthModule, IsActivatedGuard } from '@/auth';
import { ProgressModule } from '@/progress';
import { CommentsModule } from '@/comments';
import { DatabaseModule } from '@/database';
import { RedisModule } from '@/redis';
import { MailModule } from '@/mail';

@Module({
	imports: [
		CacheModule.register({
			isGlobal: true,
			max: 50,
		}),
		ConfigModule.forRoot({
			envFilePath: '.env',
		}),
		RedisModule.forRoot({
			lazyConnect: true,
			host: process.env.REDIS_HOST,
			port: Number(process.env.REDIS_PORT),
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
