import { ConfigurableModuleBuilder } from '@nestjs/common';
import { PrismaClientOptions } from '@prisma/client/runtime';

export const {
	ConfigurableModuleClass,
	ASYNC_OPTIONS_TYPE,
	MODULE_OPTIONS_TOKEN,
	OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<PrismaClientOptions>({
	moduleName: 'database',
})
	.setClassMethodName('forRoot')
	.setExtras<{ isGlobal?: boolean }>(
		{ isGlobal: true, },
		(definition, extra) => ({ ...definition, global: extra.isGlobal, })
	)
	.build();
