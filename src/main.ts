import { ValidationPipe } from '@nestjs/common';
import * as validatorPackage from 'class-validator';
import * as transformerPackage from 'class-transformer';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { AppModule } from '@/app.module';
import { StandardResponseInterceptor, __PROD__ } from '@/shared';
import { ORIGIN } from '@/const';

async function bootstrap() {
	const { PORT, } = process.env;
	const app = await NestFactory.create(AppModule);

	app.use(cookieParser());
	app.enableCors({
		credentials: true,
		origin: ORIGIN,
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

	const server = __PROD__ ? 'https://abctasks.ru' : `http://localhost:${PORT}`;

	const config = new DocumentBuilder()
		.setTitle('Документация по API сервера "Task manager"')
		.setDescription('Документация по API приложения дел')
		.setVersion('1.0.0')
		.addCookieAuth(process.env.COOKIE_NAME)
		.addBearerAuth()
		.addServer(server)
		.build();

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('docs', app, document);

	/**
	 * Для преобразования BigInt в JSON
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	(BigInt.prototype as any).toJSON = function () {
		return Number(this);
	};

	await app.listen(PORT, '0.0.0.0', () => {
		console.log(`server start PORT: ${PORT}`);
	});
}
bootstrap();
