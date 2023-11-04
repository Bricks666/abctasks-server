export interface RoomLinkToken {
	readonly roomId: number;
}

export type GenerateLinkTokenParams = RoomLinkToken;

export interface RoomInviteToken {
	readonly roomId: number;
	readonly userId: number;
}

export type GenerateRoomInviteParams = RoomInviteToken;
