import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import { Group } from './models';
import { AuthModule } from '@/auth/auth.module';

@Module({
	imports: [SequelizeModule.forFeature([Group]), AuthModule],
	providers: [GroupsService],
	controllers: [GroupsController],
})
export class GroupsModule {}
