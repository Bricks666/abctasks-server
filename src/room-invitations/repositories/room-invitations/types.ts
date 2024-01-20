export interface GetRoomInvitationsParams {
	readonly roomId: number;
}

export interface GetInvitationParams {
	readonly id: number;
}

export interface GetPersonalRoomInvitationParams {
	readonly roomId: number;
	readonly userId: number;
}

export interface GetMassRoomInvitationParams {
	readonly roomId: number;
}

export interface CreateRoomInvitationParams {
	readonly roomId: number;
	readonly userId?: number;
	readonly inviterId: number;
}

export interface AnswerRoomInvitationParams {
	readonly id: number;
}

export interface RemoveRoomInvitationParams {
	readonly id: number;
}
