import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// import cookieParser from 'cookie-parser';
// import cors from 'cors';
import { AppModule } from './app.module';
import { appRoutes } from './routes';

async function bootstrap() {
	const PORT = process.env.PORT || 3000;
	const HOST = process.env.HOST || 'localhost';
	const app = await NestFactory.create(AppModule);

	// app.use(cookieParser(), cors());
	app.use('/', appRoutes);

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
