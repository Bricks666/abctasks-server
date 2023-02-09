import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from '@/users/users.module';
import { RoomsModule } from '@/rooms/rooms.module';
import { TasksModule } from '@/tasks/tasks.module';
import { GroupsModule } from '@/groups/groups.module';
import { ActivitiesModule } from '@/activities/activities.module';
import { AuthModule } from '@/auth/auth.module';
import { ProgressModule } from './progress/progress.module';
import { CommentsModule } from './comments/comments.module';
import { DatabaseModule } from './database/database.module';
import { RedisModule } from './redis/redis.module';

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
