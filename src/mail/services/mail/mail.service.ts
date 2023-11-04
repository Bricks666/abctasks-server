import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import {
	SendEmailConfirmationParams,
	SendRoomInviteConfirmationParams
} from './types';

@Injectable()
export class MailService {
	constructor(private mailerService: MailerService) {}

	async sendRoomInviteConfirmation(
		params: SendRoomInviteConfirmationParams
	): Promise<boolean> {
		const { email, name, token, } = params;

		const url = `${process.env.CLIENT_APP_HOST}/rooms/invite/personal/${token}`;

		const info = await this.mailerService.sendMail({
			to: email,
			subject: 'You have been invited into room. Check it',
			template: './room-invite',
			context: {
				name,
				url,
			},
		});

		if (info.rejected.length !== 0) {
			throw new InternalServerErrorException(
				`Email-invitation to ${email} was not sent`
			);
		}

		return true;
	}

	async sendEmailConfirmation(
		params: SendEmailConfirmationParams
	): Promise<boolean> {
		const { email, name, token, } = params;

		const url = `${process.env.CLIENT_APP_HOST}/registration/activate?token=${token}`;

		const info = await this.mailerService.sendMail({
			to: email,
			subject: 'Confirm you email for end registration',
			template: './confirm-email',
			context: {
				name,
				url,
			},
		});

		if (info.rejected.length !== 0) {
			throw new InternalServerErrorException(
				`Email-invitation to ${email} was not sent`
			);
		}

		return true;
	}
}
