export interface SendRoomInviteConfirmationParams {
	readonly name: string;
	readonly email: string;
	readonly token: string;
}

export interface SendEmailConfirmationParams {
	readonly name: string;
	readonly token: string;
	readonly email: string;
}
