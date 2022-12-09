import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProgressService } from './progress.service';
import { ProgressController } from './progress.controller';
import { Task } from '@/tasks/models';

@Module({
	imports: [SequelizeModule.forFeature([Task])],
	providers: [ProgressService],
	controllers: [ProgressController],
})
export class ProgressModule {}
