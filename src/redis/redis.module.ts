import { DynamicModule, Module } from '@nestjs/common';
import {
	ASYNC_OPTIONS_TYPE,
	ConfigurableModuleClass,
	OPTIONS_TYPE
} from './redis.module-definition';
import { RedisService } from './redis.service';

@Module({
	providers: [RedisService],
	exports: [RedisService],
})
export class RedisModule extends ConfigurableModuleClass {
	static forRoot(options: typeof OPTIONS_TYPE): DynamicModule {
		return { ...super.forRoot(options), global: true, };
	}

	static forRootAsync(options: typeof ASYNC_OPTIONS_TYPE): DynamicModule {
		return { ...super.forRootAsync(options), global: true, };
	}
}
