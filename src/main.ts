import { ValidationPipe } from '@nestjs/common';
import * as validatorPackage from 'class-validator';
import * as transformerPackage from 'class-transformer';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { StandardResponseInterceptor } from './common';
import { CORS } from './const';
import { DatabaseService } from './database/database.service';

async function bootstrap() {
	const { PORT, } = process.env;
	const app = await NestFactory.create(AppModule);

	const prismaService = app.get(DatabaseService);
	await prismaService.enableShutdownHooks(app);

	app.use(cookieParser());
	app.enableCors({
		credentials: true,
		origin: CORS.ORIGIN,
	});
	app.useGlobalPipes(
		new ValidationPipe({
			validatorPackage,
			transformerPackage,
			forbidUnknownValues: false,
		})
	);
	app.useGlobalInterceptors(new StandardResponseInterceptor());
	app.setGlobalPrefix('api');

	const config = new DocumentBuilder()
		.setTitle('Документация по API сервера "Task manager"')
		.setDescription('Документация по API приложения дел')
		.setVersion('1.0.0')
		.addCookieAuth(process.env.COOKIE_NAME)
		.addBearerAuth()
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('docs', app, document);

	/**
	 * Для преобразования BigInt в JSON
	 */
	(BigInt.prototype as any).toJSON = function () {
		return (this as bigint).toString();
	};
	await app.listen(PORT, '0.0.0.0', () => {
		console.log(`server start PORT: ${PORT}`);
	});
}
bootstrap();
