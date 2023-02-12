import { Module } from '@nestjs/common';

import { ProgressService } from './services';
import { ProgressController } from './controllers';
import { ProgressRepository } from './repositories';

@Module({
	imports: [],
	providers: [ProgressService, ProgressRepository],
	controllers: [ProgressController],
})
export class ProgressModule {}
