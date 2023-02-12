import { ConfigurableModuleBuilder } from '@nestjs/common';
import { RedisOptions } from 'ioredis';

export const {
	ConfigurableModuleClass,
	MODULE_OPTIONS_TOKEN,
	OPTIONS_TYPE,
	ASYNC_OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<RedisOptions>({
	moduleName: 'Redis',
})
	.setExtras<{ isGlobal?: boolean }>(
		{ isGlobal: true, },
		(definition, extra) => ({ ...definition, global: extra.isGlobal, })
	)
	.setClassMethodName('forRoot')
	.build();
