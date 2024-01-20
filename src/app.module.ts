import { APP_GUARD } from '@nestjs/core';
import { CacheModule, CacheStore, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RedisClientOptions } from 'redis';
import { redisStore } from 'cache-manager-redis-store';
import { UsersModule } from '@/users/users.module';
import { RoomsModule } from '@/rooms/rooms.module';
import { TasksModule } from '@/tasks/tasks.module';
import { TagsModule } from '@/tags/tags.module';
import { ActivitiesModule } from '@/activities/activities.module';
import { AuthModule } from '@/auth/auth.module';
import { AuthGuard, IsActivatedGuard } from '@/auth/lib';
import { ProgressModule } from '@/progress/progress.module';
import { CommentsModule } from '@/comments/comments.module';
import { DatabaseModule } from '@/database/database.module';
import { MailModule } from '@/mail/mail.module';
import { TokensModule } from '@/tokens/tokens.module';
import { MembersModule } from '@/members/members.module';
import { InvitationsModule } from '@/room-invitations/invitations.module';
import { TestingModule } from './testing/testing.module';
import { __TESTING__ } from './shared/configs';

const modules = [
	CacheModule.register<RedisClientOptions>({
		store: redisStore as unknown as CacheStore,
		isGlobal: true,
		max: 50,
		ttl: 10,
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
	ActivitiesModule,
	MembersModule,
	ProgressModule,
	CommentsModule,
	MailModule,
	TagsModule,
	TokensModule,
	InvitationsModule,
	TestingModule
];

if (__TESTING__) {
	modules.push(TestingModule);
}

@Module({
	imports: modules,
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
