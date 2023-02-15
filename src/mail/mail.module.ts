import { join } from 'path';
import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailService } from './services';

@Module({
	imports: [
		MailerModule.forRoot({
			transport: {
				host: 'smtp.sendgrid.net',
				auth: {
					user: 'apikey',
					pass: process.env.SEND_GRID_PASS,
				},
			},
			defaults: {
				from: process.env.SEND_GRID_FROM,
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
