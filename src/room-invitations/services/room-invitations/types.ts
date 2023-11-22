export interface GetInvitationsParams {
	readonly roomId: number;
}
export interface GetInvitationParams {
	readonly token: string;
	readonly userId: number;
}

export interface GenerateInvitationLinkParams {
	readonly roomId: number;
	readonly userId?: number;
}

export interface CreatePersonalInvitation {
	readonly roomId: number;
	readonly userId: number;
	readonly inviterId: number;
}

export interface AnswerInvitationParams {
	readonly userId: number;
	readonly token: string;
}

export interface RemoveInvitationParams {
	readonly id: number;
}

export interface IsExistsParams {
	readonly roomId: number;
	readonly userId: number;
}
