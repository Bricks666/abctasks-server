export interface RoomInvitation {
	readonly roomId: number;
}

export type GenerateRoomInvitationTokenParams = RoomInvitation;

export interface PersonalRoomInvitation extends RoomInvitation {
	readonly userId: number;
}

export type GeneratePersonalRoomInvitationTokenParams = PersonalRoomInvitation;
