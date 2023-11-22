export interface GetRoomInvitationsParams {
	readonly roomId: number;
}

export interface GetRoomInvitationParams {
	readonly roomId: number;
	readonly userId: number;
	readonly inviterId?: number;
}

export interface CreateRoomInvitationParams {
	readonly roomId: number;
	readonly userId: number;
	readonly inviterId: number;
}

export interface AnswerRoomInvitationParams {
	readonly id: number;
}

export interface RemoveRoomInvitationParams {
	readonly id: number;
}
