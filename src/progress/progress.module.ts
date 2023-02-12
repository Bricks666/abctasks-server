import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/database';
import { ProgressService } from './services';
import { ProgressController } from './controllers';
import { ProgressRepository } from './repositories';

@Module({
	imports: [DatabaseModule],
	providers: [ProgressService, ProgressRepository],
	controllers: [ProgressController],
})
export class ProgressModule {}
