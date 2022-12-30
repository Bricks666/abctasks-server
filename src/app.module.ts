import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { old_User } from '@/users/models';
import { UsersModule } from '@/users/users.module';
import { RoomsModule } from '@/rooms/rooms.module';
import { old_Room } from '@/rooms/models';
import { TasksModule } from '@/tasks/tasks.module';
import { GroupsModule } from '@/groups/groups.module';
import { Group } from '@/groups/models';
import { ActivitiesModule } from '@/activities/activities.module';
import { AuthModule } from '@/auth/auth.module';
import { ProgressModule } from './progress/progress.module';
import { CommentsModule } from './comments/comments.module';
import { DatabaseModule } from './database/database.module';

@Module({
	imports: [
		CacheModule.register({
			isGlobal: true,
		}),
		ConfigModule.forRoot({
			envFilePath: '.env',
		}),
		SequelizeModule.forRoot({
			dialect: 'mariadb',
			database: process.env.DB_NAME,
			username: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			host: process.env.DB_HOST,
			port: Number(process.env.DB_PORT),
			autoLoadModels: true,
			models: [old_User, old_Room, Group],
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
