export interface GetInvitationsParams {
	readonly roomId: number;
}
export interface GetInvitationParams {
	readonly token: string;
	readonly userId: number;
}

export interface CreateMassInvitationParams {
	readonly roomId: number;
	readonly inviterId: number;
}

export interface GenerateInvitationLinkParams {
	readonly id: number;
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
	readonly id: number;
}

export interface RemoveInvitationParams {
	readonly id: number;
}

export interface IsExistsParams {
	readonly roomId: number;
	readonly userId: number;
}
