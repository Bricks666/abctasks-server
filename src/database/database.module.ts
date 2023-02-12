import { Module } from '@nestjs/common';
import { ConfigurableModuleClass } from './database.module-definition';
import { DatabaseService } from './database.service';

@Module({
	providers: [DatabaseService],
	exports: [DatabaseService],
})
export class DatabaseModule extends ConfigurableModuleClass {}
