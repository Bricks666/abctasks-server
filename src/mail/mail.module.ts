import { join } from 'path';
import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailService } from './services';

@Module({
	imports: [
		MailerModule.forRoot({
			transport: {
				host: process.env.EMAIL_HOST,
				port: Number(process.env.EMAIL_PORT),
				auth: {
					user: process.env.EMAIL_USER,
					pass: process.env.EMAIL_PASS,
				},
			},
			defaults: {
				from: process.env.EMAIL_FROM,
			},
			template: {
				adapter: new HandlebarsAdapter(),
				dir: join(__dirname, 'templates'),
			},
		})
	],
	providers: [MailService],
	exports: [MailService],
})
export class MailModule {}
