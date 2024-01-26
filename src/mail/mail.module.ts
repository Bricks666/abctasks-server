import { join } from 'path';
import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { google } from 'googleapis';
import { MailService } from './services';

const expireInTimeSeconds = 59 * 60 * 1000;

@Module({
	imports: [
		MailerModule.forRootAsync({
			useFactory: async () => {
				const oauth = new google.auth.OAuth2({
					clientId: process.env.EMAIL_CLIENT_ID,
					clientSecret: process.env.EMAIL_CLIENT_SECRET,
					redirectUri: process.env.EMAIL_REDIRECT_URI,
				});

				oauth.setCredentials({
					refresh_token: process.env.EMAIL_REFRESH_TOKEN,
				});

				const response = await oauth.getAccessToken();

				return {
					transport: {
						host: process.env.EMAIL_HOST,
						port: Number(process.env.EMAIL_PORT),
						service: 'gmail',
						secure: true,
						auth: {
							type: 'oauth2',
							user: process.env.EMAIL_USER,
							clientId: process.env.EMAIL_CLIENT_ID,
							clientSecret: process.env.EMAIL_CLIENT_SECRET,
							refreshToken: process.env.EMAIL_REFRESH_TOKEN,
							accessToken: response.token,
							expires: expireInTimeSeconds,
							provisionCallback: async (user, renew, cb) => {
								const response = await oauth.getAccessToken();

								cb(null, response.token, expireInTimeSeconds);
							},
						},
					},
					defaults: {
						from: process.env.EMAIL_FROM,
						secure: true,
					},
					template: {
						adapter: new HandlebarsAdapter(),
						dir: join(__dirname, 'templates'),
					},
					tls: {
						rejectUnauthorized: false,
					},
				};
			},
		})
	],
	providers: [MailService],
	exports: [MailService],
})
export class MailModule {}
