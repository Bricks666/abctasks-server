import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '@/users/models';
import { UsersModule } from '@/users/users.module';
import { RoomsModule } from '@/rooms/rooms.module';
import { Room, RoomUser } from '@/rooms/models';
import { TasksModule } from '@/tasks/tasks.module';
import { Task } from '@/tasks/models';
import { GroupsModule } from '@/groups/groups.module';
import { Group } from '@/groups/models';
import { ActivitiesModule } from '@/activities/activities.module';
import { Activity } from '@/activities/models';
import { AuthModule } from '@/auth/auth.module';
import { ProgressModule } from './progress/progress.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: '.env.local',
		}),
		SequelizeModule.forRoot({
			dialect: 'mariadb',
			database: process.env.DB_NAME,
			username: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			host: process.env.DB_HOST,
			port: Number(process.env.DB_PORT),
			autoLoadModels: true,
			models: [User, Room, RoomUser, Task, Group, Activity],
		}),
		AuthModule,
		UsersModule,
		RoomsModule,
		TasksModule,
		GroupsModule,
		ActivitiesModule,
		ProgressModule,
	],
})
export class AppModule {}
