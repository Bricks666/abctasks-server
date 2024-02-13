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
				secure: Boolean(+process.env.EMAIL_SECURE),
				auth: {
					user: process.env.EMAIL_USER,
					pass: process.env.EMAIL_PASSWORD,
				},
			},
			defaults: {
				from: process.env.EMAIL_FROM,
				secure: Boolean(+process.env.EMAIL_SECURE),
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
