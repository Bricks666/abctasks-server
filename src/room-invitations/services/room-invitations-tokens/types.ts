export interface RoomInvitationTokenPayload {
	readonly id: number;
	readonly roomId: number;
}

export type GenerateRoomInvitationTokenParams = RoomInvitationTokenPayload;

export interface PersonalRoomInvitationTokenPayload
	extends RoomInvitationTokenPayload {
	readonly userId: number;
}

export type GeneratePersonalRoomInvitationTokenParams =
	PersonalRoomInvitationTokenPayload;
