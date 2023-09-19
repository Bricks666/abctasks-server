export interface SendRoomInviteConfirmationParams {
	readonly name: string;
	readonly roomId: number;
	readonly email: string;
}

export interface SendEmailConfirmationParams {
	readonly name: string;
	readonly token: string;
	readonly email: string;
}
