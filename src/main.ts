import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import { ValidationPipe } from './pipes/validation.pipe';
import { AppModule } from './app.module';
import { StandardResponseInterceptor } from './interceptors/standard-response.interceptor';

async function bootstrap() {
	const PORT = process.env.PORT || 3000;
	const HOST = process.env.HOST || 'localhost';
	const app = await NestFactory.create(AppModule);

	app.use(
		cors({
			credentials: true,
			origin: /localhost/,
		}),
		cookieParser()
	);
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
