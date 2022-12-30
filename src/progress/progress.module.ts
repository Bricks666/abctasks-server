import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/database/database.module';
import { ProgressService } from './progress.service';
import { ProgressController } from './progress.controller';
import { ProgressRepository } from './repository';

@Module({
	imports: [DatabaseModule],
	providers: [ProgressService, ProgressRepository],
	controllers: [ProgressController],
})
export class ProgressModule {}
