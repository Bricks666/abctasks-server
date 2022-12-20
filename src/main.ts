import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from './common/validation.pipe';
import { AppModule } from './app.module';
import { StandardResponseInterceptor } from './common/standard-response.interceptor';
import { CORS } from './const';

async function bootstrap() {
	const { HOST, PORT, } = process.env;
	const app = await NestFactory.create(AppModule);
	app.use(cookieParser());
	app.enableCors({
		credentials: true,
		origin: CORS.ORIGIN,
	});
	app.useGlobalPipes(new ValidationPipe());
	app.useGlobalInterceptors(new StandardResponseInterceptor());
	app.setGlobalPrefix('api');

	const config = new DocumentBuilder()
		.setTitle('Документация по API сервера "Todo"')
		.setDescription('Документация по API приложения дел')
		.setVersion('1.0.0')
		.addCookieAuth(process.env.COOKIE_NAME)
		.addBearerAuth()
		.build();
	const document = SwaggerModule.createDocument(app, config);

	SwaggerModule.setup('docs', app, document);
	await app.listen(PORT, HOST, () => {
		console.log(`server start PORT: ${PORT} and HOST: ${HOST}`);
	});
}
bootstrap();
