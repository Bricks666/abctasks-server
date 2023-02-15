import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { SendRoomInviteConfirmationParams } from './types';

@Injectable()
export class MailService {
	constructor(private mailerService: MailerService) {}

	async sendRoomInviteConfirmation(
		params: SendRoomInviteConfirmationParams
	): Promise<boolean> {
		const { email, name, roomId, } = params;

		const url = `http://localhost:3000/rooms/${roomId}/invite`;

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
}
