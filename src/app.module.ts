import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from '@/users';
import { RoomsModule } from '@/rooms';
import { TasksModule } from '@/tasks';
import { GroupsModule } from '@/groups';
import { ActivitiesModule } from '@/activities';
import { AuthModule } from '@/auth';
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
		GroupsModule,
		ActivitiesModule,
		ProgressModule,
		CommentsModule,
		MailModule
	],
})
export class AppModule {}
