import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from '@/users';
import { RoomsModule } from '@/rooms';
import { TasksModule } from '@/tasks';
import { GroupsModule } from '@/groups';
import { ActivitiesModule } from '@/activities';
import { AuthModule } from '@/auth';
import { ProgressModule } from '@/progress/progress.module';
import { CommentsModule } from '@/comments';
import { DatabaseModule } from '@/database';
import { RedisModule } from '@/redis/redis.module';

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
		AuthModule,
		UsersModule,
		RoomsModule,
		TasksModule,
		GroupsModule,
		ActivitiesModule,
		ProgressModule,
		CommentsModule,
		DatabaseModule
	],
})
export class AppModule {}
